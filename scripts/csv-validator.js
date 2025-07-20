#!/usr/bin/env node

/**
 * CSV Validator for ドラマバカ一代
 * 使用方法: node scripts/csv-validator.js
 */

const fs = require('fs');
const path = require('path');

// 設定
const CONFIG = {
  dramaticsMasterPath: 'src/lib/data/dramas_master.csv',
  archivesSummaryPath: 'src/lib/data/archives_summary.csv',
  validBroadcasters: ['NHK', 'フジ', '日テレ', 'TBS', 'テレ朝', 'テレ東', '関西テレビ', 'カンテレ', '中京テレビ', 'TOKYO MX'],
  validSeasons: ['winter', 'spring', 'summer', 'autumn'],
  validStatuses: ['airing', 'completed', 'upcoming'],
  validDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'monday-friday']
};

class CSVValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  // エラーを追加
  addError(message) {
    this.errors.push(`❌ ${message}`);
  }

  // 警告を追加
  addWarning(message) {
    this.warnings.push(`⚠️  ${message}`);
  }

  // CSVファイルを読み込み
  readCSV(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.trim().split('\n');
      const headers = lines[0].split(',');
      const rows = lines.slice(1).map(line => this.parseCSVLine(line));
      return { headers, rows };
    } catch (error) {
      this.addError(`Failed to read ${filePath}: ${error.message}`);
      return null;
    }
  }

  // CSV行を解析（クォート対応）
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  // dramas_master.csvを検証
  validateDramasMaster() {
    console.log('🔍 Validating dramas_master.csv...');
    
    const data = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!data) return;

    const { headers, rows } = data;
    const expectedHeaders = ['id', 'title', 'slug', 'year', 'season', 'broadcaster', 'timeslot', 'air_day', 'genre', 'status', 'air_start', 'air_end', 'main_cast', 'warning_flags', 'tags', 'synopsis'];

    // ヘッダー検証
    if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
      this.addError(`Invalid headers. Expected: ${expectedHeaders.join(',')}, Got: ${headers.join(',')}`);
    }

    const usedIds = new Set();
    const usedSlugs = new Set();

    rows.forEach((row, index) => {
      const lineNum = index + 2; // ヘッダー分+1
      const [id, title, slug, year, season, broadcaster, timeslot, air_day, genre, status, air_start, air_end, main_cast, warning_flags, tags] = row;

      // ID検証
      const idNum = parseInt(id);
      if (isNaN(idNum)) {
        this.addError(`Line ${lineNum}: Invalid ID '${id}'`);
      } else {
        if (usedIds.has(idNum)) {
          this.addError(`Line ${lineNum}: Duplicate ID '${id}'`);
        }
        usedIds.add(idNum);

        // ID範囲検証
        const yearFromId = Math.floor(idNum / 100) + 2021;
        const yearNum = parseInt(year);
        if (yearFromId !== yearNum) {
          this.addWarning(`Line ${lineNum}: ID ${id} doesn't match year ${year} (expected ${yearFromId}00s for ${yearNum})`);
        }
      }

      // 必須フィールド検証
      if (!title) this.addError(`Line ${lineNum}: Missing title`);
      if (!slug) this.addError(`Line ${lineNum}: Missing slug`);
      
      // Slug重複検証
      if (slug) {
        if (usedSlugs.has(slug)) {
          this.addError(`Line ${lineNum}: Duplicate slug '${slug}'`);
        }
        usedSlugs.add(slug);

        // Slug形式検証
        if (!/^[a-z0-9-]+$/.test(slug)) {
          this.addError(`Line ${lineNum}: Invalid slug format '${slug}' (use lowercase, numbers, and hyphens only)`);
        }
      }

      // 年度検証
      const yearNum = parseInt(year);
      if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
        this.addError(`Line ${lineNum}: Invalid year '${year}'`);
      }

      // 季節検証
      if (!CONFIG.validSeasons.includes(season)) {
        this.addError(`Line ${lineNum}: Invalid season '${season}'. Valid: ${CONFIG.validSeasons.join(', ')}`);
      }

      // 放送局検証
      if (!CONFIG.validBroadcasters.includes(broadcaster)) {
        this.addError(`Line ${lineNum}: Invalid broadcaster '${broadcaster}'. Valid: ${CONFIG.validBroadcasters.join(', ')}`);
      }

      // 曜日検証
      if (!CONFIG.validDays.includes(air_day)) {
        this.addError(`Line ${lineNum}: Invalid air_day '${air_day}'. Valid: ${CONFIG.validDays.join(', ')}`);
      }

      // 状態検証
      if (!CONFIG.validStatuses.includes(status)) {
        this.addError(`Line ${lineNum}: Invalid status '${status}'. Valid: ${CONFIG.validStatuses.join(', ')}`);
      }

      // 日付検証
      if (air_start && !this.isValidDate(air_start)) {
        this.addError(`Line ${lineNum}: Invalid air_start date '${air_start}' (use YYYY-MM-DD format)`);
      }
      if (air_end && !this.isValidDate(air_end)) {
        this.addError(`Line ${lineNum}: Invalid air_end date '${air_end}' (use YYYY-MM-DD format)`);
      }

      // 主演キャスト検証
      if (!main_cast || main_cast.trim() === '') {
        this.addWarning(`Line ${lineNum}: Empty main_cast`);
      }

      // タグ検証
      if (tags && tags.includes('"')) {
        const tagList = tags.split(',').map(t => t.trim());
        if (tagList.length === 0) {
          this.addWarning(`Line ${lineNum}: Empty tag list`);
        }
      }
    });

    console.log(`✅ Processed ${rows.length} drama records`);
  }

  // archives_summary.csvを検証
  validateArchivesSummary() {
    console.log('🔍 Validating archives_summary.csv...');
    
    const data = this.readCSV(CONFIG.archivesSummaryPath);
    if (!data) return;

    const { headers, rows } = data;
    const expectedHeaders = ['year', 'season', 'drama_count', 'avg_baka_level', 'top_dramas', 'summary', 'id_range_start', 'id_range_end'];

    // ヘッダー検証
    if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
      this.addError(`Invalid headers in archives_summary.csv. Expected: ${expectedHeaders.join(',')}, Got: ${headers.join(',')}`);
    }

    rows.forEach((row, index) => {
      const lineNum = index + 2;
      const [year, season, drama_count, avg_baka_level, top_dramas, summary, id_range_start, id_range_end] = row;

      // 年度検証
      const yearNum = parseInt(year);
      if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
        this.addError(`Archives line ${lineNum}: Invalid year '${year}'`);
      }

      // 季節検証
      if (!CONFIG.validSeasons.includes(season)) {
        this.addError(`Archives line ${lineNum}: Invalid season '${season}'`);
      }

      // ドラマ数検証
      const countNum = parseInt(drama_count);
      if (isNaN(countNum) || countNum < 0 || countNum > 100) {
        this.addError(`Archives line ${lineNum}: Invalid drama_count '${drama_count}'`);
      }

      // バカ度検証
      const bakaLevel = parseFloat(avg_baka_level);
      if (isNaN(bakaLevel) || bakaLevel < 1.0 || bakaLevel > 5.0) {
        this.addError(`Archives line ${lineNum}: Invalid avg_baka_level '${avg_baka_level}' (must be 1.0-5.0)`);
      }

      // ID範囲検証
      const startId = parseInt(id_range_start);
      const endId = parseInt(id_range_end);
      if (isNaN(startId) || isNaN(endId)) {
        this.addError(`Archives line ${lineNum}: Invalid ID range '${id_range_start}-${id_range_end}'`);
      } else if (startId >= endId) {
        this.addError(`Archives line ${lineNum}: Invalid ID range order '${id_range_start}-${id_range_end}'`);
      }
    });

    console.log(`✅ Processed ${rows.length} archive records`);
  }

  // 日付形式検証
  isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  // 統計情報を表示
  showStats() {
    const dramasData = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!dramasData) return;

    const { rows } = dramasData;
    
    // 年度別統計
    const yearStats = {};
    const statusStats = {};
    const broadcasterStats = {};

    rows.forEach(row => {
      const [id, title, slug, year, season, broadcaster, timeslot, air_day, genre, status] = row;
      
      yearStats[year] = (yearStats[year] || 0) + 1;
      statusStats[status] = (statusStats[status] || 0) + 1;
      broadcasterStats[broadcaster] = (broadcasterStats[broadcaster] || 0) + 1;
    });

    console.log('\n📊 Statistics:');
    console.log('Year Distribution:', yearStats);
    console.log('Status Distribution:', statusStats);
    console.log('Broadcaster Distribution:', broadcasterStats);
  }

  // 検証実行
  run() {
    console.log('🚀 Starting CSV validation...\n');

    this.validateDramasMaster();
    this.validateArchivesSummary();
    this.showStats();

    // 結果表示
    console.log('\n📋 Validation Results:');
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => console.log(error));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(warning));
    }

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All validations passed!');
    }

    // 終了コード設定
    if (this.errors.length > 0) {
      console.log('\n💥 Validation failed with errors.');
      process.exit(1);
    } else {
      console.log('\n🎉 Validation completed successfully!');
      process.exit(0);
    }
  }
}

// スクリプト実行
if (require.main === module) {
  const validator = new CSVValidator();
  validator.run();
}

module.exports = CSVValidator;