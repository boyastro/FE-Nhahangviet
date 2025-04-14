// ==================== All Import
import React from 'react'

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-600">Chào Admin!</h1>
      <p className="my-4">Đây là giao diện quản trị.</p>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-500 duration-200"
      >
        Đăng xuất
      </button>
    </div>
  )
}

export default AdminDashboard
