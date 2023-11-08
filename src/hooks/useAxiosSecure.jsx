import url from "../url";
import axios from "axios"
import useAuth from "./useAuth";
import {useEffect} from "react";

const axiosSecure = axios.create({
	baseURL: url,
	withCredentials: true,
})

export default function useAxiosSecure() {
	const { logoutUser } = useAuth();
	
	useEffect(() => {
		axiosSecure.interceptors.response.use(res => {
			return res;
			}, error => {
				if (error.response.status === 401 || error.response.status === 403) {
					logoutUser()
						.catch(error => console.log(error))
				}
		})
    }, [])
	
	return axiosSecure;
}
