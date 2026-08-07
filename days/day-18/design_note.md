# BÁO CÁO THIẾT KẾ: MINI-PAL (MINIMAL AGENT RUNTIME)

**Tác giả**: Hoàng Thanh Chiến  
**Bài tập**: Day 18 - Build a Working Mini-PAL  
**Ngày thực hiện**: Tháng 8, 2026  

---

## 1. Tổng quan & Mục tiêu

Tài liệu này trình bày thiết kế và cài đặt hệ thống **Mini-PAL** — một Agent Runtime tối giản (Engine lõi) vận hành theo mô hình suy luận ReAct (Reasoning + Acting). 

Không phụ thuộc vào các framework bên ngoài cồng kềnh, hệ thống trực tiếp điều phối 3 thành phần cốt lõi:
1. **Orchestration Loop**: Vòng lặp điều phối đa bước với cơ chế kiểm tra điều kiện dừng an toàn.
2. **Tool-Calling Engine**: Cơ chế đăng ký và thực thi công cụ có cách ly lỗi (Error Boundary).
3. **Memory Manager**: Quản lý lịch sử hội thoại có cấu trúc ngữ cảnh.

---

## 2. Kiến trúc Vòng lặp Điều phối (Orchestration Loop)

Vòng lặp điều phối đóng vai trò là động cơ chính xử lý tương tác giữa người dùng, LLM và môi trường thực thi công cụ.

```
       +---------------------------------------------+
       |             Yêu cầu từ Người dùng           |
       +---------------------------------------------+
                              |
                              v
                 +--------------------------+
                 |  Thêm vào Memory         |
                 +--------------------------+
                              |
                              v
+-------------> +--------------------------+
|               |  Gửi Memory cho LLM      |
|               +--------------------------+
|                             |
|               +-------------+-------------+
|               |                           |
|       [Yêu cầu gọi Tool]            [Câu trả lời cuối]
|               |                           |
|               v                           v
|   +-----------------------+   +-----------------------+
|   | Thực thi Tool An toàn |   | Thêm vào Memory       |
|   +-----------------------+   +-----------------------+
|               |                           |
|   +-----------------------+               v
|   | Đẩy Kết quả vào Memory|           [HOÀN THÀNH]
|   +-----------------------+
|               |
+---------------+ (Vòng lặp tiếp theo)
```

### Các điểm trọng tâm trong thiết kế:
- **Giới hạn số bước (Max Steps Safeguard)**: Thiết lập giới hạn `max_steps = 5` nhằm đảm bảo hệ thống không rơi vào vòng lặp vô tận khi LLM gặp sự cố suy luận.
- **Kiểm soát trạng thái**: Tại mỗi vòng lặp, runtime kiểm tra:
  - Nếu xuất hiện `tool_calls` → Chuyển sang tiến trình chạy Tool.
  - Phản hồi dạng văn bản thuần không chứa tool call → Coi là kết quả cuối cùng và kết thúc vòng lặp.

---

## 3. Giao diện Công cụ & Cơ chế Thực thi (Tool Interface)

Lớp `ToolRegistry` được thiết kế để tách biệt định nghĩa công cụ và logic thực thi:

### Đăng ký & Thực thi an toàn:
- **Đăng ký**: Các công cụ được khai báo kèm theo chuẩn Schema thông số:
  ```python
  @registry.register(
      name="get_order_details",
      description="Tra cứu thông tin chi tiết đơn hàng.",
      schema={"type": "object", "properties": {"order_id": {"type": "string"}}}
  )
  def get_order_details(order_id: str): ...
  ```
- **Error Boundaries**: Toàn bộ quá trình thực thi Tool được bọc trong khối `try...except`. Nếu Tool phát sinh lỗi, thông báo lỗi được biến đổi thành chuỗi JSON phản hồi lại cho LLM. Nhờ đó, LLM có thể tự điều chỉnh suy luận ở bước sau thay vì làm dừng chương trình.

---

## 4. Mô hình Quản lý Bộ nhớ (Memory Management)

Bộ nhớ được quản lý theo mô hình hàng đợi tin nhắn nối tiếp có phân định vai trò (`role`):

| Bước | Role | Nội dung | Mục đích |
| :--- | :--- | :--- | :--- |
| **0** | `system` | Lệnh hệ thống (System Prompt) | Định hình tính cách & quy tắc làm việc |
| **1** | `user` | Yêu cầu của người dùng | Mục tiêu bài toán cần giải quyết |
| **2** | `assistant` | Suy luận & Ý định gọi Tool | Ghi lại bước trung gian của Agent |
| **3** | `tool` | Kết quả JSON thực thi Tool | Cung cấp dữ liệu thực tế cho Agent |
| **4** | `assistant` | Phản hồi tổng hợp cuối cùng | Trả kết quả hoàn chỉnh cho người dùng |

---

## 5. Minh chứng Hoàn thành & Kiểm thử

- **Mã nguồn Runtime**: [`mini_pal.py`](file:///e:/Git/my-portfolio/days/day-18/mini_pal.py)
- **Kịch bản kiểm thử**: Đã chạy thử nghiệm thành công kịch bản xử lý đơn hàng trải qua 3 vòng lặp ReAct (gồm 5 thao tác chi tiết: Tra cứu đơn hàng ➔ Áp mã giảm giá 20% ➔ Xuất hóa đơn).
- **Giao diện trực quan**: [`index.html`](file:///e:/Git/my-portfolio/days/day-18/index.html)
