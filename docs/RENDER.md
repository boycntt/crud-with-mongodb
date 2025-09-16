# Triển khai lên Render.com

Hướng dẫn nhanh để deploy ứng dụng Node (Express + MongoDB) này lên Render.com và cấu hình biến môi trường an toàn.

1) Chuẩn bị repository
- Đẩy tất cả file lên GitHub (hoặc Git provider mà Render hỗ trợ).
- Đảm bảo `package.json` và `app.js` có sẵn ở thư mục gốc.

2) Tạo dịch vụ Web trên Render
- Đăng nhập Render.com → New → Web Service
- Chọn repository và branch (ví dụ `master`).
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start` (ứng dụng dùng `node app.js` theo `package.json`)

3) Cấu hình biến môi trường (Rất quan trọng)
- Trong Render dashboard cho service, mở tab `Environment` → `Environment Variables`.
- Thêm biến:
  - `MONGODB_URI` = (URI kết nối tới MongoDB Atlas của bạn)
  - `PORT` = `3001` (tùy chọn — Render cung cấp `PORT` tự động; tốt nhất để trống và để Render gán)
  - `API_KEY` = (chìa khoá API bạn muốn dùng)

Lưu ý: Không nên dựa vào endpoint `POST /api/generate-key` để ghi file `.env` trên Render vì filesystem của Render là ephemeral và thay đổi khi deploy — tôi đã làm controller trả về key và cả lời nhắc nếu không thể ghi `.env`. Thay vào đó, hãy cấu hình `API_KEY` trực tiếp trong Environment Variables của Render.

4) Bảo mật
- Khi đã set `API_KEY` trong Environment, mọi request tới các endpoint được bảo vệ phải gửi header `x-api-key: <API_KEY>`.
- Để bắt đầu, bạn có thể gọi `POST /api/generate-key` trên môi trường local để tạo khóa hoặc tạo thủ công trong Render dashboard.

5) (Tùy chọn) CNAME / Custom domain
- Render hỗ trợ custom domain; thêm domain trong dashboard và cấu hình DNS theo hướng dẫn Render.

6) Kiểm tra
- Mở URL service do Render cung cấp, ví dụ `https://your-service.onrender.com/api/docs` để xem Swagger UI.
- Đừng quên cấu hình `x-api-key` trong Swagger Authorize (góc trên phải) để test các endpoint được bảo vệ.

7) Ghi chú kỹ thuật
- `POST /api/generate-key` sẽ trả về khóa đã tạo; nếu không thể ghi `.env` trên host, response sẽ chứa `warning` kèm hướng dẫn đặt `API_KEY` trong dashboard Render.
- Nếu cần rollback/rotate key: cập nhật biến `API_KEY` trong Render dashboard và redeploy hoặc restart service.

Nếu bạn muốn, tôi có thể:
- Thêm một đoạn mã health-check (ping MongoDB) trước khi server lắng nghe để Render đánh giá trạng thái tốt hơn.
- Thêm hướng dẫn cURL/PowerShell mẫu để gọi `POST /api/generate-key` và copy kết quả vào Render dashboard.

---

Khuyến nghị chuyên sâu cho Render

- Node version: sử dụng Node LTS (>=16) hoặc ít nhất >=14.21.3 nếu bạn muốn chạy các package mới (một số dependency yêu cầu >=14.21.3). Trong Render dashboard, bạn có thể chọn runtime hoặc thêm `engines` vào `package.json`:

```json
"engines": { "node": ">=16" }
```

- Build command: dùng `npm ci` cho reproducible build khi có `package-lock.json`.

- Start command: `npm start` (ứng dụng dùng `node app.js`).

- Health check: Render cho phép cấu hình Health Check URL; đặt nó thành:

```
/health
```

  Endpoint `/health` sẽ trả `{ status: 'ok', db: 'connected' }` khi Mongoose đã nối thành công; Render sẽ xem service là healthy khi endpoint trả 200.

- Environment variables: luôn set `MONGODB_URI` và `API_KEY` trong dashboard. Không dựa vào ghi file `.env` runtime.

- Logs & monitoring: xem `Logs` tab trong Render để kiểm tra các lỗi kết nối MongoDB hay lỗi khởi động.

Nếu muốn, tôi có thể thêm vào `package.json` trường `engines` và một script `healthcheck` hoặc cấu hình `start` phù hợp cho Render; nói tôi biết bạn muốn cài `engines` mặc định nào.
