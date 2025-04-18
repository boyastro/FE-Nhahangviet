// EditBookingModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBookingModal = ({ booking, onClose, onSave }) => {
  const [updatedBooking, setUpdatedBooking] = useState({
    ...booking,
    selectedDishes: booking.selectedDishes || [],
  });

  const [menuList, setMenuList] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menus');
        setMenuList(res.data);
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách món ăn:', err.message);
      }
    };

    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDish = () => {
    const dishToAdd = menuList.find((dish) => dish._id === selectedMenuId);
    if (!dishToAdd) return;

    setUpdatedBooking((prev) => ({
      ...prev,
      selectedDishes: [
        ...prev.selectedDishes,
        {
          _id: dishToAdd._id,
          name: dishToAdd.name,
          image: dishToAdd.image,
          quantity: 1,
        },
      ],
    }));
  };

  const handleRemoveDish = (dishId) => {
    setUpdatedBooking((prev) => ({
      ...prev,
      selectedDishes: prev.selectedDishes.filter((dish) => dish._id !== dishId),
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/bookings/${updatedBooking._id}`, updatedBooking, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(updatedBooking);
    } catch (err) {
      console.error('❌ Lỗi khi cập nhật đặt bàn:', err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Chỉnh sửa Đặt Bàn</h3>

        <div className="mb-4">
          <label className="block">Ngày</label>
          <input
            type="date"
            name="date"
            value={updatedBooking.date ? new Date(updatedBooking.date).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block">Thời gian</label>
          <input
            type="time"
            name="time"
            value={updatedBooking.time}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block">Số người</label>
          <input
            type="number"
            name="people"
            value={updatedBooking.people}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block">Ghi chú</label>
          <textarea
            name="note"
            value={updatedBooking.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-2">🍽️ Món ăn đã chọn:</h4>
          {(updatedBooking.selectedDishes || []).map((dish) => (
            <div key={dish._id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src={dish.image || 'https://via.placeholder.com/100'}
                  alt={dish.name}
                  className="w-16 h-16 object-cover rounded-full mr-2"
                />
                <span className="font-medium">{dish.name}</span>
              </div>
              <span
                onClick={() => handleRemoveDish(dish._id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Xóa
              </span>
            </div>
          ))}

          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-2">🧾 Danh sách món ăn:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
              {menuList.map((dish) => (
                <div
                  key={dish._id}
                  className="cursor-pointer border rounded-lg p-2 hover:bg-gray-100 transition flex flex-col items-center"
                  onClick={() => {
                    const alreadyAdded = updatedBooking.selectedDishes.some(d => d._id === dish._id);
                    if (!alreadyAdded) {
                      setUpdatedBooking((prev) => ({
                        ...prev,
                        selectedDishes: [
                          ...prev.selectedDishes,
                          {
                            _id: dish._id,
                            name: dish.name,
                            image: dish.image,
                            quantity: 1,
                          },
                        ],
                      }));
                    }
                  }}
                >
                  <img
                    src={dish.image || 'https://via.placeholder.com/100'}
                    alt={dish.name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                  />
                  <p className="text-sm font-medium text-center">{dish.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <span
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Đóng
          </span>
          <span
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Lưu thay đổi
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
