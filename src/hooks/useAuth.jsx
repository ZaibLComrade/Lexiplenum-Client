import {useContext} from "react"
import {AuthContext} from "../Providers/AuthProvider"


export default function useAuth() {
	const authContext = useContext(AuthContext);
	return authContext;
}
