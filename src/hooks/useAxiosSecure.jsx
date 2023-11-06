import url from "../url";
import axios from "axios"

const axiosSecure = axios.create({
	baseURL: url,
	withCredentials: true,
})

export default function useAxiosSecure() {
	return axiosSecure;
}
