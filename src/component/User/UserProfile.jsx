import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({ username: '', email: '' })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data)
      setFormData({ username: res.data.username, email: res.data.email })
    } catch (err) {
      console.error('Lỗi khi lấy người dùng:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(
        'http://localhost:5000/api/users/me',
        {
          username: formData.username,
          email: formData.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
  
      console.log('✅ Update thành công:', res.data)
  
      setIsEditing(false)
      fetchUser()
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật:', err.response?.data || err.message)
    }
  }
  

  if (!user) return <div>Đang tải thông tin...</div>

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-4">
        <label className="block font-medium">Tên đăng nhập:</label>
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{user.username}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Email:</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>

      <div className="space-x-3">
        {isEditing ? (
          <>
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
              Lưu
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">
              Hủy
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  )
}

export default UserProfile
