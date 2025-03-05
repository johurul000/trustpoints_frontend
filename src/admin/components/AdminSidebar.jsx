import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineDashboard } from "react-icons/ai"
import { SiTrustpilot } from "react-icons/si"
import { MdApps } from "react-icons/md"
import { FaClipboardCheck } from "react-icons/fa6"
import { FaUserShield } from "react-icons/fa6"
import { GrServices } from "react-icons/gr"
import { TbLogout } from "react-icons/tb"
import SidebarLink from '../../components/SidebarLink'

const AdminSidebar = ({ isOpen, toggleSidebar}) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminAccess')
    localStorage.removeItem('adminRefresh')

    window.location.reload()
  }

  return (
    <div 
      className={`fixed lg:static z-40 inset-y-0 bg-lightCard dark:bg-card left-0 text-darkText 
        dark:text-grayText shadow-[4px_0_10px_rgba(0,0,0,0.25)] dark:shadow-[4px_0_10px_rgba(255, 255, 255, 0.15)]
        ${isOpen? 'translate-x-0' : '-translate-x-full'}
        transition-transform lg:translate-x-0
        `}
    
    >
      

      <div className='flex h-[6%] flex-row justify-between items-center w-full px-4 pt-3 lg:justify-center'>
        <NavLink>
          <SiTrustpilot  className='h-10 w-10 text-lightHighlight dark:text-highlight'/>
        </NavLink>
        <button
          onClick={toggleSidebar}
          className='lg:hidden text-darkText hover:text-gray-700 dark:text-grayText dark:hover:text-gray-400'
        >
          ✕
        </button>
        
      </div>

      <div
        className='p-4 w-64 lg:w-50 flex flex-col justify-center h-[94%]'
      >
        <ul className='mt-2 space-y-2'>

          <SidebarLink to="/admin/apps">
            <span className='w-6 flex justify-center'>
              <MdApps className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Apps</span>
          </SidebarLink>

          <SidebarLink to="/admin/verify-tasks">
            <span className='w-6 flex justify-center'>
              <FaClipboardCheck className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Verify Tasks</span>
          </SidebarLink>

          <SidebarLink to="/admin/admins">
            <span className='w-6 flex justify-center'>
              <FaUserShield className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Admins</span>
          </SidebarLink>

          <SidebarLink to="/admin/settings">
            <span className='w-6 flex justify-center'>
              <GrServices className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Settings</span>
          </SidebarLink>

        </ul>


        {/* Logout button */}
        <div className='mt-auto'>
          <button 
            onClick={handleLogout} 
            className='w-full flex items-center text-darkText dark:text-white hover:bg-[#dbecff] dark:hover:bg-gray-700 p-2 rounded'>
            <span className='w-6 flex justify-center'>
              <TbLogout className='h-6 w-6'/>
            </span> 
            <span className='flex-1'>Logout</span>
          </button>
        </div>


      </div>

      
    </div>
  )
}

export default AdminSidebar