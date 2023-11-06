import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Headroom from "react-headroom";
import LoadingScreen from "./LoadingScreen";

export  default function Root() {
	const [isDark, setIsDark] = useState(true)
	const { loading } = useAuth();
	if(loading) return <LoadingScreen/>
	
	return <div data-theme={ isDark ? "dark" : "light" }>
		<Headroom>
			<Navbar setDark={ setIsDark }/>
		</Headroom>
		<Outlet/>
	</div>
}
