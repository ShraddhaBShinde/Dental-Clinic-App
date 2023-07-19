import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function AdminProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user, isAdmin } = useSelector((state) => state.user);

    // Get user
    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/getAdminData",
                { token: localStorage.getItem("token") },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                dispatch(setUser(res.data.data));

            } else {
                localStorage.clear();
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);


    if (localStorage.getItem("token")) {
        if (isAdmin) {
            return children;
        } else {
            return <Navigate to="/" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
}
