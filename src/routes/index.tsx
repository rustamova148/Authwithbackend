import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Forgotpassword from "../pages/Forgotpassword/Forgotpassword";
import Verifycode from "../pages/Verifycode/Verifycode";
import Setnewpassword from "../pages/Setnewpassword/Setnewpassword";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import Userdetail from "../pages/Userdetail/Userdetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/forgotpassword",
        element: <Forgotpassword />
    },
    {
        path: "/verifycode",
        element: <Verifycode />
    },
    {
        path: "/setnewpassword",
        element: <Setnewpassword />
    },
    {
        path: "/users/:id",
        element: <Userdetail />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
               path: "/profile",
               element: <Profile />
            }
        ]
    }
])

export default router;