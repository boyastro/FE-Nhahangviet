// ==================== All Import
import React            from 'react'
import { Link }         from 'react-router-dom'
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <>
            {/* ================= Footer Part ================= */}
            <footer className='mt-[125px] w-full bg-[#474747] px-[150px] pt-[120px] pb-[55px]'>
                <ul className=' flex justify-between'>
                    <ul className='flex flex-col gap-[30px] text-white'>

                        {/* ------- Footer Logo ------- */}
                        <Link to = '/' className='flex items-center '>
                            <img src="/footerLogo.png" alt="footer_logo_Image" />
                            <h3 className='ml-3 font-PlayfairD font-semibold text-[33px] italic leading-[30px]'>Nhà Hàng Việt</h3>
                        </Link>

                        {/* ------- Footer Info ------- */}
                        <li>
                            Tinh hoa ẩm thực việt vào trong từng món ăn
                        </li>

                        {/* ------- All Social Links ------- */}
                        <li className='flex gap-3'>
                            <a href="#" className='text-[20px] p-[10px] bg-[#AD343E] hover:bg-red-600 rounded-full'><FaTwitter /></a>
                            <a href="#" className='text-[20px] p-[10px] bg-[#AD343E] hover:bg-red-600 rounded-full'><FaFacebookF /></a>
                            <a href="#" className='text-[20px] p-[10px] bg-[#AD343E] hover:bg-red-600 rounded-full'><FaInstagram /></a>
                        </li>
                    </ul>

                    {/* ================= All Pages Link Part ================= */}
                    <ul className='text-white'>
                        <h4 className='font-DM_sans font-bold text-base'>Trang</h4>
                        <li className=' flex flex-col gap-5 font-DM_sans font-normal text-base mt-10 '>
                            <Link to = "/" className='hover:text-red-400'>Trang chủ</Link>
                            <Link to = "/about" className='hover:text-red-400'>Giới thiệu</Link>
                            <Link to = "/manu" className='hover:text-red-400'>Thực Đơn</Link>
                            <Link to = "/blog" className='hover:text-red-400'>Bài Viết</Link>
                            <Link to = "/contact" className='hover:text-red-400'>Liên Hệ</Link>
                            <Link to = "#" className='hover:text-red-400'>Giao Hàng</Link>
                        </li>
                    </ul>

                    {/* ================= All Utility Pages Link Part ================= */}
                    <ul className='text-white'>
                        <h4 className='font-DM_sans font-bold text-base'>Hỗ trợ kỹ thuật</h4>
                        <li className=' flex flex-col gap-5 font-DM_sans font-normal text-base mt-10 '>
                            <Link to = "#" className='hover:text-red-400'>Chi Nhánh</Link>
                            <Link to = "#" className='hover:text-red-400'>Đại Lý</Link>
                        </li>
                    </ul>

                    {/* ================= Footer Images Part ================= */}
                    <ul>
                        <a href='#' className='text-white font-DM_sans font-bold text-base hover:text-red-300 duration-200'>Theo dõi chúng tôi trên Instagram</a>
                        <li className='w-[405px] mt-10 flex flex-wrap gap-3'>
                            <img src="/footerImg1.png" alt="footer_img1" className='hover:scale-105 duration-300' />
                            <img src="/footerImg2.png" alt="footer_img2" className='hover:scale-105 duration-300' />
                            <img src="/footerImg3.png" alt="footer_img3" className='hover:scale-105 duration-300' />
                            <img src="/footerImg4.png" alt="footer_img4" className='hover:scale-105 duration-300' />
                        </li>
                    </ul>
                </ul>

                {/* ================= Copy-Right Part ================= */}
                <p className='mt-[130px] text-[#ADB29E] text-base font-DM_sans font-normal text-center'>Copyright © 2025 Hcmut. All Rights Reserved</p>  
            </footer>
        </>
    )
}

export default Footer