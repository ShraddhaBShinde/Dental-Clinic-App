import React from 'react'
import UserNav from '../Navbar/UserNav'

const UserLayout = (props) => {
    return (
        <div>
            <UserNav />
            {props.children}
        </div>
    );
};

export default UserLayout