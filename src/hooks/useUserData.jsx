import {useEffect, useState} from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useUserData() {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const [userData, setUserData] = useState({});
	
	const email = user.email;
	useEffect(() => {
		axiosSecure(`/users?email=${email}`)
			.then(res => setUserData(res.data));
	}, [axiosSecure, email])
	
	return userData;
}
