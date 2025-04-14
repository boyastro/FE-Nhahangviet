// ==================== All Import
import React from 'react'

const UserDashboard = ({ onLogout }) => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600">Chào người dùng!</h1>
      <p className="my-4">Chào mừng bạn đến với trang user dashboard.</p>
      <button
        onClick={onLogout}
        className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-600 duration-200"
      >
        Đăng xuất
      </button>
    </div>
  )
}

export default UserDashboard
