import Root from "./components/Root";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AddBooks from "./components/books/AddBooks";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import BorrowedBooks from "./components/books/BorrowedBooks";
import url from "./url";

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
				element: <PrivateRoute><AllBooks/></PrivateRoute>,
				loader: () => fetch(`${url}/books`)
			}, {
				path: "/books/borrowed",
				element: <PrivateRoute><BorrowedBooks/></PrivateRoute>
			}, {
				path: "/login",
				element: <LoginPage/>
			}, {
				path: "/register",
				element: <RegisterPage/>
			}, {
				path: "/books/:category",
				element: <AllBooks/>,
				loader: ({ params }) => fetch(`${url}/books/${params.category}`)
			}
		]
	},
])

export default router;
