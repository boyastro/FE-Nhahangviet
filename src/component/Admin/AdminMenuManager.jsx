import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminMenuManager = () => {
  // ==================== All useStates
  const [menuItems, setMenuItems] = useState([])  // Danh sách món ăn
  const [form, setForm] = useState({
    name: '',
    price: '',
    info: '',
    image: '',
    category: ''
  })
  const [editId, setEditId] = useState(null)  // Lưu trữ id món cần chỉnh sửa
  const [isModalOpen, setIsModalOpen] = useState(false)  // Điều khiển mở/đóng modal

  // ==================== Fetch Menu Items from API
  const fetchMenu = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/menus')
      setMenuItems(res.data)  // Set danh sách món ăn từ backend vào state
    } catch (err) {
      console.error('❌ Lỗi khi fetch menu:', err.message)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])  // Chạy lại khi component load

  // ==================== Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // ==================== Submit Form (Thêm/Sửa món)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        // Cập nhật món ăn
        await axios.put(`http://localhost:5000/api/menus/${editId}`, form)
      } else {
        // Thêm món ăn mới
        await axios.post('http://localhost:5000/api/menus', form)
      }
      setForm({ name: '', price: '', info: '', image: '', category: '' })
      setEditId(null)
      setIsModalOpen(false)  // Đóng modal sau khi thêm/sửa
      fetchMenu()  // Cập nhật lại danh sách sau khi thêm/sửa
    } catch (err) {
      console.error('❌ Lỗi khi lưu món:', err.message)
    }
  }

  // ==================== Handle Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price,
      info: item.info,
      image: item.image,
      category: item.category
    })
    setEditId(item._id)  // Set editId để biết món nào đang được chỉnh sửa
    setIsModalOpen(true)  // Mở modal khi chỉnh sửa món ăn
  }

  // ==================== Handle Open/Close Modal
  const openModal = () => {
    setForm({ name: '', price: '', info: '', image: '', category: '' })  // Reset form khi mở modal
    setEditId(null)
    setIsModalOpen(true)  // Mở modal
  }

  const closeModal = () => {
    setIsModalOpen(false)  // Đóng modal
  }

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* === Danh sách món ăn === */}
      <div className="mb-6">
        <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Thêm món
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-lg">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p>{item.info}</p>
              <p className="font-bold text-red-600">{item.price}</p>
              <p className="italic text-gray-600">Loại: {item.category}</p>
              <button
                onClick={() => handleEdit(item)}
                className="mt-2 bg-yellow-400 px-3 py-1 rounded"
              >
                Sửa
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* === Modal Form Thêm/Sửa Món === */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">{editId ? 'Chỉnh sửa món' : 'Thêm món mới'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Tên món"
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="price"
                placeholder="Giá"
                value={form.price}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="info"
                placeholder="Mô tả"
                value={form.info}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="image"
                placeholder="Link hình ảnh"
                value={form.image}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="">Chọn loại bữa ăn</option>
                <option value="Bữa Sáng">Bữa Sáng</option>
                <option value="Bữa Trưa">Bữa Trưa</option>
                <option value="Đồ Uống">Đồ Uống</option>
                <option value="Tráng Miệng">Tráng Miệng</option>
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  {editId ? 'Cập nhật' : 'Thêm món'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminMenuManager
