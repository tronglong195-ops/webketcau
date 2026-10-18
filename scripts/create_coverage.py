import json

coverage = {
  "meta": {
    "title": "Kết Cấu Bê Tông Cốt Thép - Võ Bá Tầm",
    "standard": "TCXDVN 356:2005 (T1, T2) / TCVN 5574-1991 (T3) đối chiếu TCVN 5574:2018",
    "updated_at": "2026-10-18"
  },
  "volumes": [
    {
      "id": "tap-1",
      "title": "Tập 1 — Cấu kiện cơ bản",
      "chapters": [
        {
          "id": "c1",
          "title": "Chương 1: Khái niệm chung",
          "sections": [
            { "id": "1.1", "title": "Bê tông cốt thép là gì", "status": "pending" },
            { "id": "1.2", "title": "Phân loại", "status": "pending" },
            { "id": "1.3", "title": "Ưu và khuyết điểm", "status": "pending" },
            { "id": "1.4", "title": "Phạm vi ứng dụng", "status": "pending" }
          ]
        },
        {
          "id": "c2",
          "title": "Chương 2: Tính chất cơ lý của vật liệu",
          "sections": [
            { "id": "2.1", "title": "Tính chất cơ lý của bê tông", "status": "pending" },
            { "id": "2.2", "title": "Cường độ bê tông", "status": "pending" },
            { "id": "2.3", "title": "Cấp độ bền và mác", "status": "pending" },
            { "id": "2.4", "title": "Nhân tố ảnh hưởng đến cường độ", "status": "pending" },
            { "id": "2.5", "title": "Cường độ của bê tông (khối vuông, lăng trụ, kéo)", "status": "pending" },
            { "id": "2.6", "title": "Biến dạng", "status": "pending" },
            { "id": "2.7", "title": "Môđun đàn hồi Eb", "status": "pending" },
            { "id": "2.8", "title": "Biểu đồ ứng suất – biến dạng cốt thép", "status": "pending" },
            { "id": "2.9", "title": "Cường độ tiêu chuẩn cốt thép", "status": "pending" },
            { "id": "2.10", "title": "Cường độ tính toán cốt thép", "status": "pending" },
            { "id": "2.11", "title": "Môđun đàn hồi Es", "status": "pending" },
            { "id": "2.12", "title": "Bê tông cốt thép cộng tác chịu lực", "status": "pending" }
          ]
        },
        {
          "id": "c3",
          "title": "Chương 3: Nguyên lý tính toán và cấu tạo",
          "sections": [
            { "id": "3.1", "title": "Khái niệm", "status": "pending" },
            { "id": "3.2", "title": "Các giai đoạn trạng thái ứng suất – biến dạng của cấu kiện chịu uốn", "status": "pending" },
            { "id": "3.3", "title": "Các phương pháp tính toán", "status": "pending" },
            { "id": "3.4", "title": "Tải trọng tiêu chuẩn và tải trọng tính toán", "status": "pending" },
            { "id": "3.5", "title": "Nguyên lý cấu tạo cốt thép", "status": "pending" }
          ]
        },
        {
          "id": "c4",
          "title": "Chương 4: Cấu kiện chịu uốn",
          "sections": [
            { "id": "4.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "4.2", "title": "Tính cường độ trên tiết diện thẳng góc (THGH1)", "status": "pending" },
            { "id": "4.3", "title": "Tiết diện chữ nhật + bài tập", "status": "pending" },
            { "id": "4.4", "title": "Tiết diện chữ I, T", "status": "pending" },
            { "id": "4.5", "title": "Tính cường độ trên tiết diện nghiêng", "status": "pending" },
            { "id": "4.6", "title": "Tiết diện nghiêng theo lực cắt + bài tập", "status": "pending" },
            { "id": "4.7", "title": "Biểu đồ vật liệu", "status": "pending" }
          ]
        },
        {
          "id": "c5",
          "title": "Chương 5: Cấu kiện chịu nén",
          "sections": [
            { "id": "5.1", "title": "Khái niệm", "status": "pending" },
            { "id": "5.2", "title": "Đặc điểm cấu tạo", "status": "pending" },
            { "id": "5.3", "title": "Nén đúng tâm", "status": "pending" },
            { "id": "5.4", "title": "Sự làm việc của cấu kiện nén lệch tâm", "status": "pending" },
            { "id": "5.5", "title": "Tiết diện chữ nhật", "status": "pending" },
            { "id": "5.6", "title": "Biểu đồ tương tác", "status": "pending" }
          ]
        },
        {
          "id": "c6",
          "title": "Chương 6: Cấu kiện chịu kéo",
          "sections": [
            { "id": "6.1", "title": "Khái niệm chung và cấu tạo", "status": "pending" },
            { "id": "6.2", "title": "Kéo đúng tâm", "status": "pending" },
            { "id": "6.3", "title": "Kéo lệch tâm, tiết diện chữ nhật", "status": "pending" },
            { "id": "6.4", "title": "Kéo lệch tâm theo lực cắt", "status": "pending" }
          ]
        },
        {
          "id": "c7",
          "title": "Chương 7: Tính toán theo trạng thái giới hạn thứ hai",
          "sections": [
            { "id": "7.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "7.2", "title": "Độ cong của trục dầm", "status": "pending" },
            { "id": "7.3", "title": "Độ cong của dầm BTCT", "status": "pending" },
            { "id": "7.4", "title": "Độ cứng B", "status": "pending" },
            { "id": "7.5", "title": "Độ võng", "status": "pending" },
            { "id": "7.6", "title": "Mở rộng khe nứt thẳng góc", "status": "pending" }
          ]
        },
        {
          "id": "c8",
          "title": "Chương 8: Cấu kiện chịu uốn – xoắn",
          "sections": [
            { "id": "8.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "8.2", "title": "Cấu tạo", "status": "pending" },
            { "id": "8.3", "title": "Độ bền tiết diện không gian", "status": "pending" },
            { "id": "8.4", "title": "Tính sơ bộ cốt thép", "status": "pending" },
            { "id": "8.5", "title": "Kiểm tra khả năng chịu lực", "status": "pending" },
            { "id": "8.6", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c9",
          "title": "Chương 9: Sàn bê tông cốt thép",
          "sections": [
            { "id": "9.1", "title": "Khái niệm", "status": "pending" },
            { "id": "9.2", "title": "Bản dầm (một phương)", "status": "pending" },
            { "id": "9.3", "title": "Giới thiệu đồ án", "status": "pending" },
            { "id": "9.4", "title": "Bản sàn", "status": "pending" },
            { "id": "9.5", "title": "Dầm phụ", "status": "pending" },
            { "id": "9.6", "title": "Dầm chính", "status": "pending" },
            { "id": "9.7", "title": "Cấu tạo cốt thép trong dầm", "status": "pending" },
            { "id": "9.8", "title": "Biểu đồ vật liệu", "status": "pending" },
            { "id": "9.9", "title": "Ví dụ", "status": "pending" },
            { "id": "9.10", "title": "Thống kê vật liệu", "status": "pending" },
            { "id": "9.11", "title": "Hướng dẫn SAP2000: dầm liên tục, tổ hợp nội lực", "status": "pending" }
          ]
        },
        {
          "id": "do-an-bt1",
          "title": "Đồ án BT1: Sàn sườn toàn khối loại bản dầm",
          "sections": [
            { "id": "bt1.1", "title": "Đề bài và số liệu tính toán", "status": "pending" },
            { "id": "bt1.2", "title": "Thiết kế bản sàn", "status": "pending" },
            { "id": "bt1.3", "title": "Thiết kế dầm phụ", "status": "pending" },
            { "id": "bt1.4", "title": "Thiết kế dầm chính", "status": "pending" },
            { "id": "bt1.5", "title": "Bản vẽ và thống kê cốt thép", "status": "pending" }
          ]
        },
        {
          "id": "phu-luc-t1",
          "title": "Phụ lục Tập 1",
          "sections": [
            { "id": "pl1.1", "title": "Bảng đổi đơn vị và cường độ vật liệu", "status": "pending" },
            { "id": "pl1.2", "title": "Bảng tra cốt thép diện tích và trọng lượng", "status": "pending" },
            { "id": "pl1.3", "title": "Bảng hệ số tính toán dầm liên tục", "status": "pending" }
          ]
        }
      ]
    },
    {
      "id": "tap-2",
      "title": "Tập 2 — Cấu kiện nhà cửa",
      "chapters": [
        {
          "id": "c1",
          "title": "Chương 1: Sàn bê tông cốt thép",
          "sections": [
            { "id": "1.1", "title": "Khái niệm", "status": "pending" },
            { "id": "1.2", "title": "Bản dầm", "status": "pending" },
            { "id": "1.3", "title": "Sàn sườn toàn khối loại bản dầm", "status": "pending" },
            { "id": "1.4", "title": "Sàn bản kê bốn cạnh", "status": "pending" },
            { "id": "1.5", "title": "Tính dầm dọc (trục B) theo sơ đồ dẻo", "status": "pending" },
            { "id": "1.6", "title": "Sàn có hệ dầm trực giao", "status": "pending" },
            { "id": "1.7", "title": "Sàn ô cờ", "status": "pending" },
            { "id": "1.8", "title": "Sàn gạch bọng", "status": "pending" },
            { "id": "1.9", "title": "Sàn nấm", "status": "pending" },
            { "id": "1.10", "title": "Sàn panen lắp ghép", "status": "pending" }
          ]
        },
        {
          "id": "c2",
          "title": "Chương 2: Khung bê tông cốt thép",
          "sections": [
            { "id": "2.1", "title": "Khái niệm", "status": "pending" },
            { "id": "2.2", "title": "Khung toàn khối", "status": "pending" },
            { "id": "2.3", "title": "Khung lắp ghép", "status": "pending" },
            { "id": "2.4", "title": "Khe biến dạng", "status": "pending" },
            { "id": "2.5", "title": "Khung không gian", "status": "pending" }
          ]
        },
        {
          "id": "c3",
          "title": "Chương 3: Móng bê tông cốt thép",
          "sections": [
            { "id": "3.1", "title": "Khái niệm", "status": "pending" },
            { "id": "3.2", "title": "Móng đơn", "status": "pending" },
            { "id": "3.3", "title": "Móng đơn lắp ghép", "status": "pending" },
            { "id": "3.4", "title": "Móng băng", "status": "pending" },
            { "id": "3.5", "title": "Móng (cứng hữu hạn) mềm", "status": "pending" },
            { "id": "3.6", "title": "Móng băng dưới tường", "status": "pending" },
            { "id": "3.7", "title": "Móng băng giao nhau", "status": "pending" },
            { "id": "3.8", "title": "Móng bè", "status": "pending" }
          ]
        },
        {
          "id": "c4",
          "title": "Chương 4: Nhà công nghiệp một tầng lắp ghép",
          "sections": [
            { "id": "4.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "4.2", "title": "Thiết kế khung ngang", "status": "pending" },
            { "id": "4.3", "title": "Xác định tải trọng", "status": "pending" },
            { "id": "4.4", "title": "Nội lực trong cột", "status": "pending" },
            { "id": "4.5", "title": "Tổ hợp nội lực", "status": "pending" },
            { "id": "4.6", "title": "Tính cốt thép", "status": "pending" },
            { "id": "4.7", "title": "Một số yêu cầu về cấu tạo", "status": "pending" },
            { "id": "4.8", "title": "Cột hai nhánh", "status": "pending" },
            { "id": "4.9", "title": "Nội lực khi khung có số nhịp nhỏ hơn ba hoặc nhà lệch cao trình", "status": "pending" },
            { "id": "4.10", "title": "Kiểm tra cột theo phương ngoài mặt phẳng khung", "status": "pending" },
            { "id": "4.11", "title": "Kiểm tra cột khi vận chuyển, cẩu lắp", "status": "pending" },
            { "id": "4.12", "title": "Cấu tạo hệ giằng", "status": "pending" }
          ]
        },
        {
          "id": "c5",
          "title": "Chương 5: Kết cấu mái",
          "sections": [
            { "id": "5.1", "title": "Dầm mái", "status": "pending" },
            { "id": "5.2", "title": "Dàn mái", "status": "pending" }
          ]
        },
        {
          "id": "phu-luc-t2",
          "title": "Phụ lục Tập 2",
          "sections": [
            { "id": "pl2.1", "title": "Bảng tra nội lực sàn nấm, bản kê 4 cạnh", "status": "pending" },
            { "id": "pl2.2", "title": "Bảng tra tính móng trên nền đàn hồi", "status": "pending" }
          ]
        }
      ]
    },
    {
      "id": "tap-3",
      "title": "Tập 3 — Các cấu kiện đặc biệt",
      "chapters": [
        {
          "id": "c1",
          "title": "Chương 1: Cầu thang",
          "sections": [
            { "id": "1.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "1.2", "title": "Cấu tạo bậc thang", "status": "pending" },
            { "id": "1.3", "title": "Tải trọng tác dụng lên bản thang", "status": "pending" },
            { "id": "1.4", "title": "Cầu thang dạng bản hai vế", "status": "pending" },
            { "id": "1.5", "title": "Limon (H.1.24)", "status": "pending" },
            { "id": "1.6", "title": "Limon (H.1.29)", "status": "pending" },
            { "id": "1.7", "title": "Xương cá (H.1.32)", "status": "pending" },
            { "id": "1.8", "title": "Xương cá (H.1.36)", "status": "pending" },
            { "id": "1.9", "title": "Xương cá (H.1.39)", "status": "pending" },
            { "id": "1.10", "title": "Răng cưa (H.1.44)", "status": "pending" },
            { "id": "1.11", "title": "Cầu thang xoắn dạng limon", "status": "pending" },
            { "id": "1.12", "title": "Cầu thang xoắn dạng bản", "status": "pending" },
            { "id": "1.13", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c2",
          "title": "Chương 2: Bể chứa chất lỏng",
          "sections": [
            { "id": "2.1", "title": "Khái niệm", "status": "pending" },
            { "id": "2.2", "title": "Bể nước trên mái", "status": "pending" },
            { "id": "2.3", "title": "Bể tròn", "status": "pending" },
            { "id": "2.4", "title": "Bể ngầm hình chữ nhật", "status": "pending" },
            { "id": "2.5", "title": "Bể ngầm hình tròn", "status": "pending" },
            { "id": "2.6", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c3",
          "title": "Chương 3: Tường chắn đất",
          "sections": [
            { "id": "3.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "3.2", "title": "Tải trọng tác dụng lên tường chắn", "status": "pending" },
            { "id": "3.3", "title": "Kích thước sơ bộ", "status": "pending" },
            { "id": "3.4", "title": "Áp lực đất", "status": "pending" },
            { "id": "3.5", "title": "Tường góc không có thành chống", "status": "pending" },
            { "id": "3.6", "title": "Tính toán cường độ", "status": "pending" },
            { "id": "3.7", "title": "Tường góc có thành chống", "status": "pending" },
            { "id": "3.8", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c4",
          "title": "Chương 4: Silô – Bunke",
          "sections": [
            { "id": "4.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "4.2", "title": "Bunke", "status": "pending" },
            { "id": "4.3", "title": "Tính toán bunke", "status": "pending" },
            { "id": "4.4", "title": "Mômen uốn trong tường bunke", "status": "pending" },
            { "id": "4.5", "title": "Silô", "status": "pending" },
            { "id": "4.6", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c5",
          "title": "Chương 5: Kết cấu mái vỏ",
          "sections": [
            { "id": "5.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "5.2", "title": "Lý thuyết phi mômen", "status": "pending" },
            { "id": "5.3", "title": "Lý thuyết màng", "status": "pending" },
            { "id": "5.4", "title": "Phân loại vỏ", "status": "pending" },
            { "id": "5.5", "title": "Vỏ thoải cong hai chiều, độ cong dương", "status": "pending" },
            { "id": "5.6", "title": "Nguyên tắc thiết kế cấu tạo", "status": "pending" },
            { "id": "5.7", "title": "Vỏ thoải cong hai chiều, độ cong âm", "status": "pending" },
            { "id": "5.8", "title": "Vỏ cầu", "status": "pending" },
            { "id": "5.9", "title": "Mái vỏ tổ hợp", "status": "pending" },
            { "id": "5.10", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "c6",
          "title": "Chương 6: Cấu kiện chịu uốn xoắn",
          "sections": [
            { "id": "6.1", "title": "Khái niệm chung", "status": "pending" },
            { "id": "6.2", "title": "Cấu tạo", "status": "pending" },
            { "id": "6.3", "title": "Kết quả nghiên cứu", "status": "pending" },
            { "id": "6.4", "title": "Giả thiết tính toán", "status": "pending" },
            { "id": "6.5", "title": "Tính uốn – xoắn tiết diện chữ nhật", "status": "pending" },
            { "id": "6.6", "title": "Thực hành tính toán", "status": "pending" },
            { "id": "6.7", "title": "Bài tập", "status": "pending" }
          ]
        },
        {
          "id": "phu-luc-t3",
          "title": "Phụ lục Tập 3",
          "sections": [
            { "id": "pl3.1", "title": "Bảng tra nội lực vỏ mỏng, bể tròn", "status": "pending" },
            { "id": "pl3.2", "title": "Bảng tra áp lực đất tường chắn", "status": "pending" }
          ]
        }
      ]
    }
  ]
}

with open('coverage.json', 'w', encoding='utf-8') as f:
    json.dump(coverage, f, ensure_ascii=False, indent=2)

print("Created coverage.json successfully!")
