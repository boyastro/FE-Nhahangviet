// ==================== All Import
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ==================== All Component
const BookUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    people: 1,
    note: '',
    selectedDishes: []
  })
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')

  // ==================== Fetch menu từ DB
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menus')
        setMenuItems(res.data)
      } catch (err) {
        console.error('❌ Lỗi khi lấy menu:', err.message)
      }
    }
    fetchMenu()
  }, [])

  // ==================== Xử lý thay đổi input form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ==================== Toggle món ăn đã chọn
  const toggleDish = (dishId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedDishes.includes(dishId)
      const updatedDishes = isSelected
        ? prev.selectedDishes.filter((id) => id !== dishId)
        : [...prev.selectedDishes, dishId]
      return { ...prev, selectedDishes: updatedDishes }
    })
  }

  // ==================== Gửi đặt bàn
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token') // Lấy token từ localStorage

      const res = await axios.post('http://localhost:5000/api/bookings', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      })

      alert('✅ Đặt bàn thành công!')
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        people: 1,
        note: '',
        selectedDishes: [],
      })
    } catch (err) {
      console.error('❌ Lỗi khi đặt bàn:', err.message)
      alert('❌ Lỗi khi gửi dữ liệu.')
    }
  }

  // ==================== Lọc món theo category
  const filteredMenu = selectedCategory === 'Tất cả'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory)

  const categories = ['Tất cả', 'Bữa Sáng', 'Bữa Trưa', 'Đồ Uống', 'Tráng Miệng']

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📝 Đặt Bàn</h2>

      {/* Thông tin khách hàng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        />
        <input
          type="number"
          name="people"
          placeholder="Số người"
          min="1"
          value={formData.people}
          onChange={handleChange}
          required
          className="border p-3 rounded w-full"
        />
        <textarea
          name="note"
          placeholder="Ghi chú (nếu có)"
          value={formData.note}
          onChange={handleChange}
          rows="3"
          className="border p-3 rounded w-full md:col-span-2"
        />
      </div>

      {/* Chọn món ăn kèm */}
      <div>
        <label className="font-semibold block mb-2">🍽️ Chọn món ăn kèm:</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`px-4 py-1 rounded-full border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-blue-100'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMenu.map((dish) => (
            <div
              key={dish._id}
              className={`border p-2 rounded-lg cursor-pointer hover:shadow ${
                formData.selectedDishes.includes(dish._id)
                  ? 'border-blue-500 bg-blue-50'
                  : ''
              }`}
              onClick={() => toggleDish(dish._id)}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="text-sm font-medium">{dish.name}</h4>
              <p className="text-xs text-gray-600">{dish.category}</p>
              <p className="text-sm font-bold text-red-500">
                {Number(dish.price).toLocaleString('vi-VN')} đ
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Nút submit */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500"
        >
          ✅ Đặt Bàn
        </button>
      </div>
    </form>
  )
}

export default BookUser
