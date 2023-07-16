import React from 'react'
import AdminNav from '../Navbar/AdminNav'

const AdminLayout = (props) => {
    return (
        <div>
            <AdminNav />
            {props.children}
        </div>
    )
}

export default AdminLayout