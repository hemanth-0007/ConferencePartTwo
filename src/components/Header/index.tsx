"use client";
import React, { useEffect } from 'react'
import styles from './Header.module.css'
import { FaUser, FaRegUser } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useState } from 'react';
import Link from 'next/link';
import {usePathname,  useRouter } from 'next/navigation';


const Header = () => {

    const navItems = [
        { id : "1", title: 'Home', link: '/home' },
        // { id : "2", title: 'Users', link: '/home/users' },
        { id : "2", title: 'Papers', link: '/home/papers' },
        // { id : "3", title: 'Assigned Papers', link: '/home/assigned-papers' },
        // { id : "4", title: 'Reviewed Papers', link: '/home/reviewed-papers' },
        { id : "5", title: 'Deadline', link: '/home/deadline' },
        { id : "6", title: 'Add Reviewer', link: '/home/add-reviewer' },
    ]
    const pathname = usePathname()
    const router = useRouter();
    // console.log(pathname.split('/').pop());
    const activePath = '/' + pathname.split('/').pop();
    // console.log(activePath);
    
    
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState("1");

    const onClickLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
 

    return (
        <header className='shadow-md'>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 lg:py-8 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center lg:order-2">
                        {isMenuOpen ? <FaUser  className="text-2xl cursor-pointer text-blue-700"   /> :
                            <FaRegUser onMouseEnter={() => setIsMenuOpen(true)} className="text-2xl cursor-pointer " />}
                        {isMenuOpen && (
                            <div  onMouseLeave={() => setIsMenuOpen(false)} className={`${styles.dropdownMenu} rounded-full`}>
                                <div className='flex flex-row justify-end text-2xl pt-1 pr-1 cursor-pointer 
                                        hover:text-blue-700'>
                                    <IoCloseCircleSharp className='' onClick={() => setIsMenuOpen(false)} />
                                </div>
                                <Link href="/home/profile">
                                    <h3 className={styles.dropdownItem}>View Profile</h3>
                                </Link>
                                <h3 className={styles.dropdownItem} onClick={onClickLogout}>Logout</h3>
                            </div>
                        )}
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <Link onClick={() => setActiveTab(item.id)} className={activeTab === item.id ? styles.active_nav_item : styles.nav_item} href={item.link}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
