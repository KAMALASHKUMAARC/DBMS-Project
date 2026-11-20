import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const {
        isAdmin,
        adminLoading,
        checkedAdmin
    } = useAppContext()

     useEffect(() => {
        if (
            checkedAdmin &&
            user &&
            !isAdmin
        ) {

            toast.error(
                'You are not authorized to access admin dashboard'
            )

        }

        }, [checkedAdmin, user, isAdmin])

        // WAIT
        if (
            loading ||
            adminLoading ||
            !checkedAdmin
        ) {

            return <div>Loading...</div>

        }

        // NOT LOGGED IN
        if (!user) {

            return <Navigate to="/login" replace />

        }

        // NOT ADMIN
        if (!isAdmin) {

            return <Navigate to="/" replace />

        }

        return children
    }

export default AdminRoute