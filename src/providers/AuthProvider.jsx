import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../config/firebase.config";
import { 
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	updateProfile,
} from "firebase/auth"
import useAxiosSecure from "../hooks/useAxiosSecure";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			const userEmail = currentUser?.email || user?.email;
			const userCredential = { email: userEmail }
			setUser(currentUser);
			setLoading(false);
			if(currentUser) {
				axiosSecure.post(`/jwt?method=login`, userCredential)
			} else {
				axiosSecure.post(`/jwt?method=logout`, userCredential)
			}
		})
		return () => unsubscribe();
	}, [axiosSecure, user?.email])
	
	const registerUser = (email, password) => {
		setLoading(false);
		return createUserWithEmailAndPassword(auth, email, password);
	}
	
	const loginUser = (email, password) => {
		setLoading(false);
		return signInWithEmailAndPassword(auth, email, password);
	}
	
	const logoutUser = () => {
		setLoading(false);
		return signOut(auth);
	}

	const googleSignInUser = () => {
		setLoading(false);
		const provider = new GoogleAuthProvider;
		return signInWithPopup(auth, provider);
	}
	
	const authUtilities = {
		user,
		setUser,
		loading,
		setLoading, 
		registerUser,
		loginUser,
		logoutUser,
		googleSignInUser,
		updateProfile,
		navigate,
	}
	return <AuthContext.Provider value={ authUtilities }>
		{ children }
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.node,
}
