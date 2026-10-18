export interface ChapterItem {
  id: string;
  path: string;
  volumeId: 'tap1' | 'tap2' | 'tap3';
  volumeName: string;
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export const TAP1_CHAPTERS: ChapterItem[] = [
  {
    id: 'c1',
    path: '/tap-1/chuong-1',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 1',
    title: 'Khái niệm chung',
    desc: 'Bản chất vật lý của BTCT, phân loại, ưu khuyết điểm và phạm vi ứng dụng trong xây dựng.',
  },
  {
    id: 'c2',
    path: '/tap-1/chuong-2',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 2',
    title: 'Tính chất cơ lý của vật liệu',
    desc: 'Cường độ bê tông B15-B40, cốt thép CI-CIV, lực dính bám, môđun đàn hồi Eb, Es và từ biến.',
  },
  {
    id: 'c3',
    path: '/tap-1/chuong-3',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 3',
    title: 'Nguyên lý tính toán và cấu tạo',
    desc: '3 giai đoạn ứng suất biến dạng, phương pháp TTGH 1 (độ bền) & TTGH 2 (nứt, võng), quy tắc cấu tạo cốt thép.',
    highlight: true,
  },
  {
    id: 'c4',
    path: '/tap-1/chuong-4',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 4',
    title: 'Cấu kiện chịu uốn',
    desc: 'Tính toán dầm chữ nhật cốt đơn, cốt kép, dầm chữ T, cường độ chịu cắt tiết diện nghiêng và biểu đồ vật liệu.',
  },
  {
    id: 'c5',
    path: '/tap-1/chuong-5',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 5',
    title: 'Cấu kiện chịu nén',
    desc: 'Cột nén đúng tâm, nén lệch tâm bé và lệch tâm lớn, ảnh hưởng uốn dọc eta và cột đai xoắn.',
  },
  {
    id: 'c6',
    path: '/tap-1/chuong-6',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 6',
    title: 'Cấu kiện chịu kéo',
    desc: 'Kéo đúng tâm (thanh căng vòm, bể tròn) và kéo lệch tâm bé/lớn theo điều kiện cường độ.',
  },
  {
    id: 'c7',
    path: '/tap-1/chuong-7',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 7',
    title: 'Tính toán nứt và biến dạng',
    desc: 'Kiểm tra mở rộng khe nứt acrc <= [acrc], độ cứng chống uốn B và độ võng dầm f <= [f] theo TTGH 2.',
  },
  {
    id: 'c8',
    path: '/tap-1/chuong-8',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 8',
    title: 'Cấu kiện chịu uốn xoắn đồng thời',
    desc: 'Mô hình giàn không gian ảo, tính toán tương tác giữa momen uốn M, lực cắt Q và momen xoắn T.',
  },
  {
    id: 'c9',
    path: '/tap-1/chuong-9',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Chương 9',
    title: 'Đồ án sàn sườn toàn khối loại bản dầm',
    desc: 'Sơ đồ hình học, mặt bằng kết cấu, tính toán cốt thép bản sàn, dầm phụ và dầm chính.',
  },
  {
    id: 'do-an-bt1',
    path: '/tap-1/do-an-bt1',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Đồ án BT1',
    title: 'Hướng dẫn chi tiết Đồ án BTCT 1',
    desc: 'Trình tự thực hiện, biểu đồ bao nội lực, chọn thép, neo cắt và bố cục bản vẽ A1.',
  },
  {
    id: 'phu-luc-1',
    path: '/tap-1/phu-luc',
    volumeId: 'tap1',
    volumeName: 'Tập 1: Cấu kiện cơ bản',
    num: 'Phụ lục T1',
    title: 'Bảng tra cứu vật liệu BTCT',
    desc: 'Cấp độ bền bê tông B15-B40, nhóm cốt thép CI-CIV, diện tích thanh thép As và bảng tra alpha_m, xi.',
  },
];

export const TAP2_CHAPTERS: ChapterItem[] = [
  {
    id: 'tap2-c1',
    path: '/tap-2/chuong-1',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Chương 1',
    title: 'Sàn bê tông cốt thép nhiều tầng',
    desc: 'Sàn không dầm, sàn nấm, sàn sườn ô cờ, hệ dầm trực giao và phân tích theo phương pháp phần tử hữu hạn.',
  },
  {
    id: 'tap2-c2',
    path: '/tap-2/chuong-2',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Chương 2',
    title: 'Khung bê tông cốt thép',
    desc: 'Khung phẳng toàn khối, khung không gian, nút khung cứng, khe lún và khe co giãn nhiệt độ.',
  },
  {
    id: 'tap2-c3',
    path: '/tap-2/chuong-3',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Chương 3',
    title: 'Móng bê tông cốt thép',
    desc: 'Móng đơn nông, móng băng dưới tường và dưới hàng cột, móng bè toàn diện và kiểm tra chọc thủng.',
  },
  {
    id: 'tap2-c4',
    path: '/tap-2/chuong-4',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Chương 4',
    title: 'Kết cấu nhà công nghiệp một tầng',
    desc: 'Hệ kết cấu chịu lực, tải trọng gió, cầu trục chế độ nặng/vừa, dầm cầu trục và khung ngang.',
  },
  {
    id: 'tap2-c5',
    path: '/tap-2/chuong-5',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Chương 5',
    title: 'Cấu kiện vượt nhịp (Dầm và dàn mái)',
    desc: 'Dầm mái chữ T, dầm mái chữ I, dàn mái vì kèo BTCT, thanh cánh thượng, cánh hạ và thanh giằng.',
  },
  {
    id: 'tap2-phu-luc',
    path: '/tap-2/phu-luc',
    volumeId: 'tap2',
    volumeName: 'Tập 2: Cấu kiện nhà cửa',
    num: 'Phụ lục T2',
    title: 'Phụ lục tra cứu Tập 2',
    desc: 'Bảng tra nội lực sàn bản kê 4 cạnh, hệ số phân phối momen và bảng tính móng cọc.',
  },
];

export const TAP3_CHAPTERS: ChapterItem[] = [
  {
    id: 'tap3-c1',
    path: '/tap-3/chuong-1',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 1',
    title: 'Cầu thang bê tông cốt thép',
    desc: 'Cầu thang bản gập hai vế, cầu thang răng cưa xương cá, cầu thang xoắn ốc và dầm cốn thang.',
  },
  {
    id: 'tap3-c2',
    path: '/tap-3/chuong-2',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 2',
    title: 'Bể chứa chất lỏng',
    desc: 'Bể tròn chịu áp lực thủy tĩnh theo lý thuyết vỏ trụ, bể chữ nhật ngầm dưới đất và chống thấm chống nứt cấp 1.',
  },
  {
    id: 'tap3-c3',
    path: '/tap-3/chuong-3',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 3',
    title: 'Tường chắn đất',
    desc: 'Tường góc chữ L không sườn, tường có sườn gia cường, áp lực đất chủ động Coulomb/Rankine và ổn định trượt/lật.',
  },
  {
    id: 'tap3-c4',
    path: '/tap-3/chuong-4',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 4',
    title: 'Silô và Bunke',
    desc: 'Silô trụ tròn chứa ngũ cốc/xi măng theo lý thuyết Janssen, bunke đáy phễu dốc xả tự do.',
  },
  {
    id: 'tap3-c5',
    path: '/tap-3/chuong-5',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 5',
    title: 'Kết cấu không gian - Mái vỏ mỏng',
    desc: 'Vỏ trụ đơn cong, vỏ nón, vòm cầu và mặt paraboloid hyperbolique (hypar) với dầm biên ứng lực trước.',
  },
  {
    id: 'tap3-c6',
    path: '/tap-3/chuong-6',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Chương 6',
    title: 'Chịu uốn xoắn theo giàn không gian',
    desc: 'Mô hình giàn ảo không gian uốn - cắt - xoắn kết hợp theo hướng dẫn hiện đại.',
  },
  {
    id: 'tap3-phu-luc',
    path: '/tap-3/phu-luc',
    volumeId: 'tap3',
    volumeName: 'Tập 3: Các cấu kiện đặc biệt',
    num: 'Phụ lục T3',
    title: 'Phụ lục tra cứu Tập 3',
    desc: 'Bảng tra hệ số Janssen, bảng tính vỏ trụ mỏng và biểu đồ nội lực bể chứa tròn.',
  },
];

export const ALL_CHAPTERS: ChapterItem[] = [
  ...TAP1_CHAPTERS,
  ...TAP2_CHAPTERS,
  ...TAP3_CHAPTERS,
];

export function getVolumeChapters(volumeId: 'tap1' | 'tap2' | 'tap3'): ChapterItem[] {
  switch (volumeId) {
    case 'tap1':
      return TAP1_CHAPTERS;
    case 'tap2':
      return TAP2_CHAPTERS;
    case 'tap3':
      return TAP3_CHAPTERS;
    default:
      return [];
  }
}

export function getAdjacentChapters(currentPath: string) {
  const cleanPath = currentPath.split('?')[0].split('#')[0];
  const idx = ALL_CHAPTERS.findIndex((c) => c.path === cleanPath);

  if (idx === -1) {
    return {
      prev: null,
      current: null,
      next: null,
      volumeChapters: [],
      currentVolume: null,
    };
  }

  const current = ALL_CHAPTERS[idx];
  const prev = idx > 0 ? ALL_CHAPTERS[idx - 1] : null;
  const next = idx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[idx + 1] : null;
  const volumeChapters = getVolumeChapters(current.volumeId);

  return {
    prev,
    current,
    next,
    volumeChapters,
    currentVolume: current.volumeId,
  };
}
