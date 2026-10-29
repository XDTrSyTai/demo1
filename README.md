# Hướng Dẫn Tùy Chỉnh Trang Web CV Cá Nhân

Trang web CV / Portfolio cá nhân này được xây dựng với mã nguồn chuẩn HTML5, CSS3 hiện đại và JavaScript thuần, mang phong cách sang trọng, trẻ trung và tương thích hoàn toàn trên mọi thiết bị (máy tính, tablet, điện thoại).

---

## 🚀 Cách Chạy Trang Web

Trang web không yêu cầu cài đặt phần mềm hay môi trường phức tạp:
1. Bạn chỉ cần **click đúp vào file `index.html`** để mở trực tiếp trên bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari,...).
2. Hoặc nếu bạn dùng VS Code / Cursor / Antigravity, bạn có thể click chuột phải vào `index.html` chọn **Open with Live Server**.

---

## 🎨 Hướng Dẫn Thay Đổi Thông Tin Cá Nhân

### 1. Thay ảnh đại diện cá nhân (Avatar)
- Chuẩn bị file ảnh chân dung của bạn (định dạng `.jpg`, `.png`, hoặc `.webp`).
- Đặt file ảnh vào thư mục `assets/images/` (ví dụ: `assets/images/avatar.jpg`).
- Mở file `index.html`, tìm thẻ `<img>` tại Hero section (khoảng dòng 135):
  ```html
  <img 
    id="profile-avatar" 
    src="assets/images/avatar-placeholder.svg" 
    alt="Ảnh đại diện Nguyễn Văn A" 
    class="avatar-image"
  >
  ```
- Đổi `src="assets/images/avatar-placeholder.svg"` thành:
  ```html
  src="assets/images/avatar.jpg"
  ```

---

### 2. Thay đổi Họ tên, Chức danh & Giới thiệu
Mở `index.html` và chỉnh sửa các nội dung văn bản:
- **Tên**: Tìm thẻ `<h1>` với class `gradient-text` (khoảng dòng 70) để thay đổi họ tên.
- **Danh sách chức danh gõ tự động (Typing Effect)**: Mở `js/main.js` (khoảng dòng 105), bạn có thể thay đổi mảng `roles`:
  ```javascript
  const roles = [
    'Full Stack Developer',
    'Frontend Specialist',
    'Backend & API Architect',
    'UI/UX Enthusiast',
  ];
  ```

---

### 3. Cập nhật liên kết Mạng xã hội & Liên hệ
Tìm phần `<!-- Social Links Bar -->` trong `index.html` (khoảng dòng 95) và thay đổi thuộc tính `href`:
- **GitHub**: `href="https://github.com/ten-tai-khoan-cua-ban"`
- **LinkedIn**: `href="https://linkedin.com/in/ten-tai-khoan-cua-ban"`
- **Facebook**: `href="https://facebook.com/ten-tai-khoan-cua-ban"`
- **Email**: `href="mailto:email-cua-ban@gmail.com"`
- **Số điện thoại / Zalo**: `href="tel:+84987654321"`

---

### 4. Gắn liên kết Tải file CV PDF
- Đặt file CV của bạn vào thư mục dự án (ví dụ đặt tên là `NguyenVanA_CV.pdf`).
- Trong `index.html`, tìm nút có `id="cv-download-btn"`:
  ```html
  <a href="NguyenVanA_CV.pdf" download="NguyenVanA_CV.pdf" class="btn btn-secondary">
    ... Tải CV (PDF)
  </a>
  ```

---

## 🌟 Các Tính Năng Nổi Bật Sẵn Có
- 🌓 **Chuyển đổi Sáng / Tối (Light & Dark Mode)**: Có lưu trạng thái vào `localStorage` và tự động nhận diện chế độ của hệ điều hành. Chống chớp sáng (Anti-FOUC).
- 📱 **Mobile Friendly (Responsive 100%)**: Menu trượt mượt mà trên điện thoại.
- 📋 **Sao chép Email 1-click**: Nút copy email nhanh kèm hiệu ứng thông báo toast notification.
- ⚡ **Hiệu ứng gõ chữ sinh động**: Tự động hiển thị các vai trò và kỹ năng luân phiên.
- 🎯 **Coding Skills trực quan**: Phân chia khoa học giữa Frontend, Backend và DevOps/Công cụ.

