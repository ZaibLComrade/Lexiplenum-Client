import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Headroom from "react-headroom";
import LoadingScreen from "./LoadingScreen";
import Footer from "./shared/Footer";

export  default function Root() {
	const [isDark, setIsDark] = useState(false)
	const { loading } = useAuth();
	if(loading) return <LoadingScreen/>
	
	return <div data-theme={ isDark ? "dark" : "light" }>
		<Headroom>
			<Navbar setDark={ setIsDark } isDark={ isDark }/>
		</Headroom>
		<div className="min-h-[65vh]">
			<Outlet/>
		</div>
		<Footer/>
	</div>
}
