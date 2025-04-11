// ==================== All Import
import React, { useState } from 'react'

const Auth = () => {

    // ==================== All Hooks
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [form, setForm]             = useState('login') // 'login', 'signup', 'logout'

    // ==================== All Functions
    // -------- handle login
    const handleLogin = (e) => {
        e.preventDefault()
        // Add login logic here
        setIsLoggedIn(true)
        setForm('logout')
    }

    // -------- handle signup
    const handleSignup = (e) => {
        e.preventDefault()
        // Add signup logic here
        setIsLoggedIn(true)
        setForm('logout')
    }

    // -------- handle logout
    const handleLogout = () => {
        setIsLoggedIn(false)
        setForm('login')
    }

    return (
        <>
            {/* ============== Auth Section ============== */}
            <section className='flex justify-center items-start pt-10 min-h-screen bg-gray-100'>
                <div className='w-[400px] bg-white p-8 rounded-2xl shadow-xl'>

                    {/* ============== Login Form ============== */}
                    {form === 'login' && (
                        <form onSubmit={handleLogin} className='flex flex-col gap-6'>
                            <h2 className='text-3xl font-bold text-center text-[#AD343E]'>Đăng nhập</h2>
                            <input type="text" placeholder="Tên đăng nhập" required className='h-[50px] border rounded-full px-4 outline-none' />
                            <input type="password" placeholder="Mật khẩu" required className='h-[50px] border rounded-full px-4 outline-none' />
                            <button type="submit" className='bg-[#AD343E] text-white py-3 rounded-full font-bold hover:bg-red-500 active:scale-95 duration-200'>Đăng nhập</button>
                            <p className='text-center text-sm'>Chưa có tài khoản? <span onClick={() => setForm('signup')} className='text-[#AD343E] cursor-pointer hover:underline'>Đăng ký</span></p>
                        </form>
                    )}

                    {/* ============== Signup Form ============== */}
                    {form === 'signup' && (
                        <form onSubmit={handleSignup} className='flex flex-col gap-6'>
                            <h2 className='text-3xl font-bold text-center text-[#AD343E]'>Tạo tài khoản</h2>
                            <input type="text" placeholder="Tên đăng nhập" required className='h-[50px] border rounded-full px-4 outline-none' />
                            <input type="email" placeholder="Email" required className='h-[50px] border rounded-full px-4 outline-none' />
                            <input type="password" placeholder="Mật khẩu" required className='h-[50px] border rounded-full px-4 outline-none' />
                            <button type="submit" className='bg-[#AD343E] text-white py-3 rounded-full font-bold hover:bg-red-500 active:scale-95 duration-200'>Đăng ký</button>
                            <p className='text-center text-sm'>Đã có tài khoản? <span onClick={() => setForm('login')} className='text-[#AD343E] cursor-pointer hover:underline'>Đăng nhập</span></p>
                        </form>
                    )}

                    {/* ============== Logout View ============== */}
                    {form === 'logout' && isLoggedIn && (
                        <div className='flex flex-col gap-6 items-center'>
                            <h2 className='text-2xl font-bold text-[#2C2F24]'>Chào mừng bạn!</h2>
                            <button onClick={handleLogout} className='bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-600 active:scale-95 duration-200'>Đăng xuất</button>
                        </div>
                    )}

                </div>
            </section>
        </>
    )
}

export default Auth
