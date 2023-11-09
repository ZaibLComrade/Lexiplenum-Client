import url from "../url";
import axios from "axios"
import useAuth from "./useAuth";
import {useEffect} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

const axiosSecure = axios.create({
	baseURL: url,
	withCredentials: true,
})

export default function useAxiosSecure() {
	const { logoutUser } = useAuth();
	const navigate = useNavigate();
	
	useEffect(() => {
		axiosSecure.interceptors.response.use(res => {
				console.log("response", res);
				return res;
			}, err => {
				console.log(err.response)
				if(err.response.status === 401) {
					console.log("User was logged out");
					logoutUser()
						.then(() => {
							Swal.fire({
								title: "User was logged out",
								text: "Invalid token",
								icon: "info",
								confirmButtonText: "Ok"
							}).then(() => navigate("/login"))
						})
						.catch(error => console.log(error))
				}
				else if(err.response.status === 403) {
					Swal.fire({
						title: "Operation denied",
						text: "You don't have necessary permissions to make changes",
						showConfirmButton: false,
						showDenyButton: true,
						denyButtonText: "Close"
					})
				}
		})
		axiosSecure.interceptors.request.use(req => {
			console.log("request", req)
			return req;
		}, err => {
			console.log(err)
		})
    }, [])
	
	return axiosSecure;
}
