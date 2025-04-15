import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminUserManager = () => {
  const [users, setUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users')
    setUsers(res.data)
  }

  const handleEdit = (user) => {
    setEditingUserId(user._id)
    setFormData({ username: user.username, email: user.email, role: user.role })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/users/${editingUserId}`, formData)
    setEditingUserId(null)
    fetchUsers()
  }

  const handleDelete = async (id) => {
    if (confirm('Xác nhận xóa user này?')) {
      await axios.delete(`http://localhost:5000/api/users/${id}`)
      fetchUsers()
    }
  }

  return (
    <div className="p-6">
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Tên đăng nhập</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Vai trò</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2">
                {editingUserId === user._id ? (
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUserId === user._id ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUserId === user._id ? (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingUserId === user._id ? (
                  <>
                    <button onClick={handleUpdate} className="text-green-600">Lưu</button>
                    <button onClick={() => setEditingUserId(null)} className="text-gray-500">Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="text-blue-600">Sửa</button>
                    <button onClick={() => handleDelete(user._id)} className="text-red-600">Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminUserManager
