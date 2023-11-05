import Root from "./components/Root";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		children: [
			{
				path: "/*",
				element: <NotFound/>
			}, {
				path: "/home",
				element: <div>Home route under construction</div>
			}, {
				path: "/books/add",
				element: <div>Add book route under construction</div>
			}, {
				path: "/books/all",
				element: <div>All books route under construction</div>
			}, {
				path: "/books/borrowed",
				element: <div>Borrowed books element under construction</div>
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
