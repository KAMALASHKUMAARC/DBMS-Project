import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'
import AdminNavbar from '../../components/admin/AdminNavbar'
import AdminSidebar from '../../components/admin/AdminSidebar'

  const Layout = () => {

    const { user, loading } = useAuth()

    const {
        isAdmin,
        adminLoading,
        checkedAdmin
    } = useAppContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (
            !loading &&
            !adminLoading &&
            checkedAdmin
        ) {
            if (!user) {
                navigate('/login')
            }
            else if (!isAdmin) {
                navigate('/')
            }
        }
    }, [
        user,
        isAdmin,
        loading,
        adminLoading,
        checkedAdmin
    ])

    // WAIT
    if (
        loading ||
        adminLoading ||
        !checkedAdmin
    ) {
        return (
            <div className='text-white p-10'>
                Loading...
            </div>
        )
    }
    return (
      <>
      <AdminNavbar/>
      <div className='flex'>
        <AdminSidebar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px] overflow-y-auto'>
          <Outlet/>
        </div>
      </div>
      </>
    )
}
export default Layout