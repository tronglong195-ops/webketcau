import fs from 'fs';
import path from 'path';

interface Section {
  id: string;
  title: string;
  status: 'done' | 'in_progress' | 'pending';
}

interface Chapter {
  id: string;
  title: string;
  sections: Section[];
}

interface Volume {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface CoverageData {
  meta: {
    title: string;
    standard: string;
    updated_at: string;
  };
  volumes: Volume[];
}

function runCheck() {
  const coveragePath = path.resolve(process.cwd(), 'coverage.json');
  if (!fs.existsSync(coveragePath)) {
    console.error('❌ Lỗi: Không tìm thấy coverage.json!');
    process.exit(1);
  }

  const raw = fs.readFileSync(coveragePath, 'utf-8');
  let data: CoverageData;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error('❌ Lỗi cú pháp JSON trong coverage.json:', err);
    process.exit(1);
  }

  let totalSections = 0;
  let doneSections = 0;
  let inProgressSections = 0;
  let pendingSections = 0;

  console.log('\n=========================================');
  console.log('📊 KIỂM TRA ĐỘ PHỦ NỘI DUNG (COVERAGE)');
  console.log('=========================================');

  for (const vol of data.volumes) {
    let volTotal = 0;
    let volDone = 0;

    console.log(`\n📘 ${vol.title} (${vol.id}):`);
    for (const ch of vol.chapters) {
      for (const sec of ch.sections) {
        totalSections++;
        volTotal++;
        if (sec.status === 'done') {
          doneSections++;
          volDone++;
        } else if (sec.status === 'in_progress') {
          inProgressSections++;
        } else if (sec.status === 'pending') {
          pendingSections++;
        } else {
          console.error(`❌ Trạng thái không hợp lệ "${(sec as any).status}" tại [${vol.id} > ${ch.id} > ${sec.id}]`);
          process.exit(1);
        }
      }
      const chDone = ch.sections.filter(s => s.status === 'done').length;
      const statusIcon = chDone === ch.sections.length && ch.sections.length > 0 ? '✅' : chDone > 0 ? '🔄' : '⏳';
      console.log(`  ${statusIcon} ${ch.title}: ${chDone}/${ch.sections.length} hoàn thành`);
    }

    const volPct = volTotal > 0 ? ((volDone / volTotal) * 100).toFixed(1) : '0';
    console.log(`  => Tiến độ ${vol.id}: ${volDone}/${volTotal} mục (${volPct}%)`);
  }

  const overallPct = totalSections > 0 ? ((doneSections / totalSections) * 100).toFixed(1) : '0';
  console.log('\n-----------------------------------------');
  console.log(`TỔNG KẾT: ${doneSections} Hoàn thành | ${inProgressSections} Đang thực hiện | ${pendingSections} Đang chờ`);
  console.log(`ĐỘ PHỦ TOÀN BỘ SÁCH: ${overallPct}% (${doneSections}/${totalSections} mục)`);
  console.log('=========================================\n');

  // Verify that all items have defined section entries (non-empty checklist)
  if (totalSections === 0) {
    console.error('❌ Lỗi: coverage.json trống rỗng!');
    process.exit(1);
  }

  console.log('✅ Kiểm tra độ phủ hợp lệ! Được phép tiếp tục build.\n');
}

runCheck();
