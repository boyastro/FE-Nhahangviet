import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBookingModal from './EditBookingModal';  // Giả sử bạn đã tách EditBookingModal thành một file riêng

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/bookings/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sắp xếp bookings theo thời gian đặt mới nhất lên đầu
        const sortedBookings = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sortedBookings);
      } catch (err) {
        console.error('❌ Lỗi khi lấy lịch sử đặt bàn:', err.message);
      }
    };

    fetchBookings();
  }, []);

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = (updatedBooking) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking
      )
    );
    handleCloseModal();
  };

  // Hàm xử lý xóa đặt bàn
  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật lại danh sách bookings sau khi xóa
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error('❌ Lỗi khi xóa đặt bàn:', err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">🧾 Lịch sử Đặt Bàn</h2>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-700">{booking.name}</h3>
                <p className="text-sm text-gray-700">
                  📅 Ngày: {new Date(booking.date).toLocaleDateString('en-GB')} - ⏰ {booking.time}
                </p>
                <p className="text-sm text-gray-700">👥 Số người: {booking.people}</p>
                <p className="text-sm text-gray-700">📝 Ghi chú: {booking.note || 'Không có ghi chú'}</p>
              </div>
              <div>
                <span
                  onClick={() => handleEditBooking(booking)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-yellow-600 mr-2"
                >
                  Chỉnh sửa
                </span>
                <span
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-red-600"
                >
                  Xoá
                </span>
              </div>
            </div>

            {booking.selectedDishes?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">🍽️ Món ăn đã chọn:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {booking.selectedDishes.map((dish) => (
                    <div key={dish._id} className="flex flex-col items-center text-center border p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
                      <img
                        src={dish.image || 'https://via.placeholder.com/100'}
                        alt={dish.name}
                        className="w-20 h-20 object-cover rounded-full mb-2"
                      />
                      <p className="text-sm font-medium">{dish.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">Chưa có lịch sử đặt bàn.</p>
      )}

      {isModalOpen && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={handleCloseModal}
          onSave={handleSaveBooking}
        />
      )}
    </div>
  );
};

export default BookingHistory;
