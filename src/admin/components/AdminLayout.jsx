import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import FullPageLoader from '../../components/FullPageLoader'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isAdminAuthenticated = useSelector((state) => state.adminAuth.isAdminAuthenticated)
    const isLoading = useSelector((state) => state.adminAuth.isLoading)
    const [authChecked, setAuthChecked] = useState(false);

    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        if (!isLoading) {
          setAuthChecked(true);
        }
      }, [isLoading]);

      if (isLoading || !authChecked) {
        return <FullPageLoader />;
      }
    
    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace={true} />;
    }


    return (
        <div className='flex h-screen bg-lightBackground dark:bg-dark'>

            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

            <div className='flex-1 flex flex-col'>
                
                <AdminNavbar toggleSidebar={toggleSidebar}/>

                <main className='flex-1 p-4 overflow-y-auto w-full'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout