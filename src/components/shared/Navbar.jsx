import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import DarkIcon from "../../assets/darkIcon.png";
import LightIcon from "../../assets/brightIcon.png";
import logo from "/books.png";

const dummyImage = "https://i.postimg.cc/T2bdytT4/tmx6-W6-N-2696144912.png";
const siteName = "Lexiplenum"
const listItems = (
	<>
		<li>
			<NavLink className="underlay-parent" to="/">
				<span className="underlay"></span>Home
			</NavLink>
		</li>
		<li>
			<NavLink className="underlay-parent" to="/books/add">
				<span className="underlay"></span>Add Book
			</NavLink>
		</li>
		<li>
			<NavLink className="underlay-parent" to="/books/all">
				<span className="underlay"></span>All Books
			</NavLink>
		</li>
		<li>
			<NavLink className="underlay-parent" to="/books/borrowed">
				<span className="underlay"></span>Borrowed Books
			</NavLink>
		</li>
	</>
);

export default function Navbar({ setDark, isDark }) {
	const { user, logoutUser } = useAuth();
	
	const handleToggle = () => {
		// if(e.target.checked) setDark(!isDark);
		// else setDark(true);
		setDark(!isDark);
	}
	
	return (
		<div className="py-4 navbar bg-primary text-custom-grey-1 dark:text-white">
			<div className="navbar-start font-montserrat">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost xl:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5 lg:w-10 lg:h-10 md:h-7 md:w-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm text-primary font-medium dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{listItems}
					</ul>
				</div>
				<Link
					to="/"
					className="text-4xl font-bold normal-case md:text-5xl lg:text-6xl font-great-vibes btn btn-ghost"
				>
					<div className="flex items-center gap-2">
						<div className="h-[50px] hidden md:block w-[50px]">
							<img src={ logo } className="object-contain w-full h-full" alt=""/>
						</div>
						<p>{ siteName }</p>
					</div>
				</Link>
			</div>
			<div className="hidden navbar-center xl:flex">
				<ul className="px-1 menu-horizontal menu underlay-gp">
					{listItems}
				</ul>
			</div>
			<div className="navbar-end font-montserrat md:mr-4">
				<div className="items-center hidden mr-6 md:flex gap-2">
					<div className="rounded-full">
						<button 
							onClick={ handleToggle } 
							className="flex items-center w-7 h-7"
						>
						<img src={ isDark ? LightIcon : DarkIcon } 
							className="w-full h-full"/>
						</button>
					</div>
				</div>
				<div className="block dropdown dropdown-end md:hidden">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img
								src={
									user?.photoURL
										? user.photoURL
										: dummyImage
								}
							/>
						</div>
					</label>
					<ul
						tabIndex={0}
						className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
					>
						<li className="flex mx-auto jusitfy-center w-max">
							<div className="rounded-full" onClick={ handleToggle }>
								<button 
									className="flex items-center w-7 h-7"
								>
									<img 
										src={ isDark ? LightIcon : DarkIcon } 
										className="w-full h-full"
									/>
								</button>
							</div>
						</li>
						<li>
							<div className="md:text-right h-max">
								{user ? (
									<div className="font-bold text-primary">
										<p className="text">
											{user.displayName}
										</p>
										<p className="text-sm">
											{user.email}
										</p>
									</div>
								) : (
									<p>Not logged in</p>
								)}
							</div>
						</li>
						<li className="text-accent">
							{user ? (
								<a onClick={logoutUser}>Sign Out</a>
							) : (
								<Link to="/login">Login</Link>
							)}
						</li>
					</ul>
				</div>
				
				<div className="items-center hidden md:flex gap-3">
					<div className="text-right h-max">
						{user ? (
							<div>
								<p className="text">{user.displayName}</p>
								<p className="text-sm">{user.email}</p>
							</div>
						) : (
							<p>Not logged in</p>
						)}
					</div>
					<label className="btn btn-ghost btn-circle avatar">
						<div className="w-12 rounded-full">
							<img
								src={
									user?.photoURL
										? user.photoURL
										: dummyImage
								}
							/>
						</div>
					</label>
				</div>
				<div className="items-center hidden md:flex">
					{user ? (
						<button
							className="ml-2 text-white btn btn-secondary"
							onClick={logoutUser}
						>
							Sign Out
						</button>
					) : (
						<Link
							to="/login"
							className="ml-2 text-white btn btn-secondary"
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

Navbar.propTypes = {
	setDark: PropTypes.func,
	isDark: PropTypes.bool,
}
