import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { LuUsers } from 'react-icons/lu';
import { TbLogout } from 'react-icons/tb';
import { SiGoogleplay } from 'react-icons/si';
import { IoSettingsOutline } from 'react-icons/io5';

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.reload();
  };

  return (
    <div 
      className={`fixed lg:static z-40 inset-y-0 bg-lightCard dark:bg-card left-0 text-darkText 
        dark:text-grayText shadow-lg dark:shadow-md transition-transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className='flex h-[6%] flex-row justify-between items-center w-full px-4 pt-3 lg:justify-center'>
        <button onClick={toggleSidebar} className='lg:hidden text-darkText dark:text-grayText'>✕</button>
        <NavLink to='/dashboard'>
          <SiGoogleplay className='h-10 w-10 text-lightHighlight dark:text-highlight'/>
        </NavLink>
      </div>

      {/* Sidebar Links */}
      <div className='p-4 w-64 lg:w-50 flex flex-col justify-center h-[94%]'>
        <ul className='mt-2 space-y-2'>
          <SidebarLink to='/apps'>
            <SiGoogleplay className='h-6 w-6' />
            <span>Available Apps</span>
          </SidebarLink>
          <SidebarLink to='/tasks'>
            <FaTasks className='h-6 w-6' />
            <span>My Tasks</span>
          </SidebarLink>
          <SidebarLink to='/profile'>
            <LuUsers className='h-6 w-6' />
            <span>Profile</span>
          </SidebarLink>
        </ul>

        {/* Logout button */}
        <div className='mt-auto'>
          <button 
            onClick={handleLogout} 
            className='w-full flex items-center text-darkText dark:text-white hover:bg-[#dbecff] dark:hover:bg-gray-700 p-2 rounded'>
            <TbLogout className='h-6 w-6' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-highlight text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
  >
    {children}
  </NavLink>
);

export default SideBar;
