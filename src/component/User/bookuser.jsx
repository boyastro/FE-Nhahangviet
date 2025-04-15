// ==================== All Import
import React, { useState } from 'react'

// ==================== All Component
const BookUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    people: 1,
    note: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Gửi dữ liệu đặt bàn đi đây (fetch/axios hoặc gọi API backend)
    console.log('Dữ liệu đặt bàn:', formData)
    alert('Đặt bàn thành công!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Họ và tên:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Số điện thoại:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Ngày đặt:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Giờ:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Số lượng người:</label>
        <input
          type="number"
          name="people"
          min="1"
          value={formData.people}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Ghi chú (nếu có):</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-200"
      >
        Đặt Bàn
      </button>
    </form>
  )
}

export default BookUser
