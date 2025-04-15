// ==================== All Import
import React, { useState } from 'react'
import UserAdmin from './AdminUserManager'

// ==================== All Components
const AdminDashboard = ({ onLogout }) => {
  const [selectedSection, setSelectedSection] = useState('Quản Lý Người Dùng')

  const renderSection = () => {
    switch (selectedSection) {
      case 'Quản Lý Người Dùng':
        return <UserAdmin />
      case 'Quản Lý Menu':
        return <p>Thêm, sửa, xóa món ăn/menu ở đây.</p>
      case 'Quản Lý Blog':
        return <p>Viết bài, sửa/xóa bài viết blog tại đây.</p>
      case 'Quản Lý Đặt Bàn':
        return <p>Xem và xử lý các yêu cầu đặt bàn từ người dùng.</p>
      case 'Quản Lý Thanh Toán':
        return <p>Kiểm tra hóa đơn, trạng thái thanh toán.</p>
      default:
        return <p>Chọn mục quản lý để xem chi tiết.</p>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-3">
        <h2 className="text-xl font-bold text-blue-700 mb-4">🛠️ Quản trị viên</h2>
        {[
          'Quản Lý Người Dùng',
          'Quản Lý Menu',
          'Quản Lý Blog',
          'Quản Lý Đặt Bàn',
          'Quản Lý Thanh Toán',
        ].map((item) => (
          <button
            key={item}
            onClick={() => setSelectedSection(item)}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              selectedSection === item
                ? 'bg-blue-600 text-white'
                : 'hover:bg-blue-100 text-gray-800'
            } transition duration-200`}
          >
            {item}
          </button>
        ))}

        {/* Logout */}
        <button
          onClick={onLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition duration-200"
        >
          🚪 Đăng Xuất
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-semibold text-blue-700 mb-4">
          {selectedSection}
        </h1>
        <div className="bg-white border rounded-xl p-6 shadow-md">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
