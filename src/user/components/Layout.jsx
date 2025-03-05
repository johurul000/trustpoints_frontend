import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'
import NavBar from './NavBar'
import FullPageLoader from '../../components/FullPageLoader'

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const isLoading = useSelector((state) => state.auth.isLoading)
    const user = useSelector((state) => state.auth.user)

    const navigate = useNavigate()

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }



    if (isLoading){
        return <FullPageLoader />
    }
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }


    return (
        <div className='flex h-screen bg-lightBackground dark:bg-dark'>

            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

            <div className='flex-1 flex flex-col'>
                
                <NavBar toggleSidebar={toggleSidebar}/>

                <main className='flex-1 p-4 overflow-y-auto w-full'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout