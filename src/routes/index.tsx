import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Forgotpassword from "../pages/Forgotpassword/Forgotpassword";
import Verifycode from "../pages/Verifycode/Verifycode";
import Setnewpassword from "../pages/Setnewpassword/Setnewpassword";

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
])

export default router;