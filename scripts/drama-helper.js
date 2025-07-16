#!/usr/bin/env node

/**
 * Drama Helper Tool for ドラマバカ一代
 * 新ドラマ追加、ID管理、統計表示などの運用支援
 * 
 * 使用方法:
 * node scripts/drama-helper.js add --title "新番組" --broadcaster "フジ" --timeslot "月9"
 * node scripts/drama-helper.js stats
 * node scripts/drama-helper.js next-id
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// 設定
const CONFIG = {
  dramaticsMasterPath: 'src/lib/data/dramas_master.csv',
  archivesSummaryPath: 'src/lib/data/archives_summary.csv',
  validBroadcasters: ['NHK', 'フジ', '日テレ', 'TBS', 'テレ朝', 'テレ東'],
  validSeasons: ['winter', 'spring', 'summer', 'autumn'],
  validStatuses: ['airing', 'completed', 'upcoming'],
  dayMapping: {
    'monday': '月',
    'tuesday': '火', 
    'wednesday': '水',
    'thursday': '木',
    'friday': '金',
    'saturday': '土',
    'sunday': '日'
  }
};

class DramaHelper {
  constructor() {
    this.currentYear = new Date().getFullYear();
    this.currentSeason = this.getCurrentSeason();
  }

  // 現在の季節を取得
  getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) return 'winter';
    if (month >= 4 && month <= 6) return 'spring';
    if (month >= 7 && month <= 9) return 'summer';
    return 'autumn';
  }

  // CSVファイルを読み込み
  readCSV(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.trim().split('\n');
      const headers = lines[0].split(',');
      const rows = lines.slice(1).map(line => this.parseCSVLine(line));
      return { headers, rows, content };
    } catch (error) {
      console.error(`❌ Failed to read ${filePath}: ${error.message}`);
      return null;
    }
  }

  // CSV行を解析
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

  // 次のIDを取得
  getNextId() {
    const data = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!data) return null;

    const { rows } = data;
    const currentYearPrefix = (this.currentYear - 2021) * 100 + 1000;
    const currentYearIds = rows
      .map(row => parseInt(row[0]))
      .filter(id => id >= currentYearPrefix && id < currentYearPrefix + 100)
      .sort((a, b) => a - b);

    if (currentYearIds.length === 0) {
      return currentYearPrefix + 1;
    }

    return Math.max(...currentYearIds) + 1;
  }

  // タイトルからSlugを生成
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[〜～]/g, '-')
      .replace(/[！！]/g, '!')
      .replace(/[？？]/g, '?')
      .replace(/[・]/g, '-')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // 曜日を英語に変換
  dayToEnglish(timeslot) {
    const dayMap = {
      '月': 'monday', '火': 'tuesday', '水': 'wednesday',
      '木': 'thursday', '金': 'friday', '土': 'saturday', '日': 'sunday'
    };
    
    const dayChar = timeslot.charAt(0);
    return dayMap[dayChar] || 'monday';
  }

  // 新ドラマを追加
  addDrama(options) {
    const { title, broadcaster, timeslot, genre = 'ドラマ', synopsis = '', cast = '' } = options;

    // バリデーション
    if (!title) {
      console.error('❌ Title is required');
      return;
    }

    if (!CONFIG.validBroadcasters.includes(broadcaster)) {
      console.error(`❌ Invalid broadcaster. Valid: ${CONFIG.validBroadcasters.join(', ')}`);
      return;
    }

    const nextId = this.getNextId();
    if (!nextId) {
      console.error('❌ Failed to generate next ID');
      return;
    }

    const slug = this.generateSlug(title);
    const airDay = this.dayToEnglish(timeslot);
    
    // 開始日・終了日を季節に基づいて自動設定
    const { startDate, endDate } = this.getSeasonDates(this.currentYear, this.currentSeason);

    const newRow = [
      nextId,
      title,
      slug,
      this.currentYear,
      this.currentSeason,
      broadcaster,
      timeslot,
      airDay,
      genre,
      'upcoming',
      startDate,
      endDate,
      synopsis,
      cast
    ];

    // CSV形式でエスケープ
    const csvRow = newRow.map(field => {
      const str = String(field);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }).join(',');

    // ファイルに追加
    try {
      fs.appendFileSync(CONFIG.dramaticsMasterPath, '\n' + csvRow);
      console.log('✅ Drama added successfully!');
      console.log(`📺 ID: ${nextId}, Title: ${title}, Slug: ${slug}`);
      console.log(`📅 ${startDate} - ${endDate}`);
    } catch (error) {
      console.error(`❌ Failed to add drama: ${error.message}`);
    }
  }

  // 季節の開始・終了日を取得
  getSeasonDates(year, season) {
    const dates = {
      winter: { start: `${year}-01-01`, end: `${year}-03-31` },
      spring: { start: `${year}-04-01`, end: `${year}-06-30` },
      summer: { start: `${year}-07-01`, end: `${year}-09-30` },
      autumn: { start: `${year}-10-01`, end: `${year}-12-31` }
    };

    return {
      startDate: dates[season].start,
      endDate: dates[season].end
    };
  }

  // 統計情報を表示
  showStats() {
    const data = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!data) return;

    const { rows } = data;
    
    console.log('📊 ドラマバカ一代 統計情報\n');

    // 基本統計
    console.log(`📺 総ドラマ数: ${rows.length}本`);
    
    // 年度別統計
    const yearStats = {};
    const statusStats = {};
    const broadcasterStats = {};
    const genreStats = {};

    rows.forEach(row => {
      const [id, title, slug, year, season, broadcaster, timeslot, air_day, genre, status] = row;
      
      yearStats[year] = (yearStats[year] || 0) + 1;
      statusStats[status] = (statusStats[status] || 0) + 1;
      broadcasterStats[broadcaster] = (broadcasterStats[broadcaster] || 0) + 1;
      genreStats[genre] = (genreStats[genre] || 0) + 1;
    });

    // 年度別
    console.log('\n📅 年度別:');
    Object.entries(yearStats)
      .sort(([a], [b]) => b - a)
      .forEach(([year, count]) => {
        console.log(`  ${year}年: ${count}本`);
      });

    // 状態別
    console.log('\n📡 状態別:');
    Object.entries(statusStats).forEach(([status, count]) => {
      const statusMap = { airing: '放送中', completed: '放送終了', upcoming: '放送予定' };
      console.log(`  ${statusMap[status] || status}: ${count}本`);
    });

    // 放送局別
    console.log('\n📺 放送局別:');
    Object.entries(broadcasterStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([broadcaster, count]) => {
        console.log(`  ${broadcaster}: ${count}本`);
      });

    // ジャンル別（上位5位）
    console.log('\n🎭 ジャンル別（上位5位）:');
    Object.entries(genreStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([genre, count]) => {
        console.log(`  ${genre}: ${count}本`);
      });

    // ID情報
    const nextId = this.getNextId();
    console.log(`\n🆔 次のID: ${nextId}`);
    console.log(`📊 現在年度(${this.currentYear})のID範囲: ${(this.currentYear - 2021) * 100 + 1000}-${(this.currentYear - 2021) * 100 + 1099}`);
  }

  // ドラマ検索
  searchDramas(query) {
    const data = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!data) return;

    const { rows } = data;
    const results = rows.filter(row => {
      const [id, title, slug, year, season, broadcaster, timeslot, air_day, genre, status] = row;
      const searchText = `${title} ${broadcaster} ${genre} ${status}`.toLowerCase();
      return searchText.includes(query.toLowerCase());
    });

    console.log(`🔍 "${query}" の検索結果: ${results.length}件\n`);

    results.slice(0, 10).forEach(row => {
      const [id, title, slug, year, season, broadcaster, timeslot, air_day, genre, status] = row;
      console.log(`📺 [${id}] ${title}`);
      console.log(`   ${year}年${this.getSeasonDisplay(season)} | ${broadcaster} ${timeslot} | ${genre} | ${status}`);
      console.log(`   /drama/${id}\n`);
    });

    if (results.length > 10) {
      console.log(`   ... その他${results.length - 10}件`);
    }
  }

  // 季節表示を取得
  getSeasonDisplay(season) {
    const seasonMap = { winter: '冬', spring: '春', summer: '夏', autumn: '秋' };
    return seasonMap[season] || season;
  }

  // ドラマ状態を更新
  updateStatus(id, newStatus) {
    if (!CONFIG.validStatuses.includes(newStatus)) {
      console.error(`❌ Invalid status. Valid: ${CONFIG.validStatuses.join(', ')}`);
      return;
    }

    const data = this.readCSV(CONFIG.dramaticsMasterPath);
    if (!data) return;

    const { content } = data;
    const lines = content.split('\n');
    
    let updated = false;
    const newLines = lines.map(line => {
      if (line.startsWith(`${id},`)) {
        const parts = this.parseCSVLine(line);
        parts[9] = newStatus; // status field
        updated = true;
        
        // CSV形式で再構築
        return parts.map(field => {
          const str = String(field);
          if (str.includes(',') || str.includes('"')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',');
      }
      return line;
    });

    if (!updated) {
      console.error(`❌ Drama with ID ${id} not found`);
      return;
    }

    try {
      fs.writeFileSync(CONFIG.dramaticsMasterPath, newLines.join('\n'));
      console.log(`✅ Updated drama ${id} status to: ${newStatus}`);
    } catch (error) {
      console.error(`❌ Failed to update status: ${error.message}`);
    }
  }
}

// CLI設定
program
  .version('1.0.0')
  .description('ドラマバカ一代 運用支援ツール');

program
  .command('add')
  .description('新しいドラマを追加')
  .requiredOption('-t, --title <title>', 'ドラマタイトル')
  .requiredOption('-b, --broadcaster <broadcaster>', '放送局')
  .requiredOption('-s, --timeslot <timeslot>', '放送枠 (例: 月9)')
  .option('-g, --genre <genre>', 'ジャンル', 'ドラマ')
  .option('-p, --synopsis <synopsis>', 'あらすじ', '')
  .option('-c, --cast <cast>', 'キャスト (カンマ区切り)', '')
  .action((options) => {
    const helper = new DramaHelper();
    helper.addDrama(options);
  });

program
  .command('stats')
  .description('統計情報を表示')
  .action(() => {
    const helper = new DramaHelper();
    helper.showStats();
  });

program
  .command('next-id')
  .description('次に使用するIDを表示')
  .action(() => {
    const helper = new DramaHelper();
    const nextId = helper.getNextId();
    console.log(`🆔 Next ID: ${nextId}`);
  });

program
  .command('search <query>')
  .description('ドラマを検索')
  .action((query) => {
    const helper = new DramaHelper();
    helper.searchDramas(query);
  });

program
  .command('update-status <id> <status>')
  .description('ドラマの状態を更新')
  .action((id, status) => {
    const helper = new DramaHelper();
    helper.updateStatus(parseInt(id), status);
  });

// コマンドライン引数をパース
program.parse();

module.exports = DramaHelper;