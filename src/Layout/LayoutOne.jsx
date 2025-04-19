import React from 'react'
import Navbar from '../component/HomePage/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../component/HomePage/Footer'

const LayoutOne = () => {
    return (
        <>
            {/* ================= Navbar part ================= */}
            <Navbar />
            
             {/* ================= Outlet part ================= */}
            <Outlet />

            {/* ================= Footer part ================= */}
            <Footer />
        </>
    )
}

export default LayoutOne