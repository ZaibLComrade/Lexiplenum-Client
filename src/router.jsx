import Root from "./components/Root";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AddBooks from "./components/books/AddBooks";
import Home from "./components/home/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		children: [
			{
				path: "/*",
				element: <NotFound/>
			}, {
				path: "/",
				element: <Home/>
			}, {
				path: "/books/add",
				element: <PrivateRoute><AddBooks/></PrivateRoute>
			}, {
				path: "/books/all",
				element: <PrivateRoute><div>All books route under construction</div></PrivateRoute>
			}, {
				path: "/books/borrowed",
				element: <PrivateRoute><div>Borrowed books element under construction</div></PrivateRoute>
			}, {
				path: "/login",
				element: <LoginPage/>
			}, {
				path: "/register",
				element: <RegisterPage/>
			}
		]
	},
])

export default router;
