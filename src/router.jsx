import Root from "./components/Root";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AddBook from "./components/books/AddBook";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import BorrowedBooks from "./components/books/BorrowedBooks";
import url from "./url";
import BookDetails from "./components/books/BookDetails";
import UpdateBook from "./components/books/UpdateBook";
import Read from "./components/books/Read";

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
				element: <PrivateRoute><AddBook/></PrivateRoute>
			}, {
				path: "/books/all",
				element: <PrivateRoute><AllBooks/></PrivateRoute>,
			}, {
				path: "/books/borrowed",
				element: <PrivateRoute><BorrowedBooks/></PrivateRoute>
			}, {
				path: "/books/update/:id",
				element: <PrivateRoute><UpdateBook/></PrivateRoute>,
				loader: ({ params }) => fetch(`${url}/book/${params.id}`)
			}, {
				path: "/books/details/:id",
				element: <PrivateRoute><BookDetails/></PrivateRoute>,
				loader: ({ params }) => fetch(`${url}/book/${params.id}`)
			}, {
				path: "/books/read/:id",
				element: <Read/>
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
