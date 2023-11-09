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
import axios from "axios";
import url from "../url";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			const userEmail = currentUser?.email || user?.email;
			const userCredential = { email: userEmail }
			setUser(currentUser);
			setLoading(false);
			if(currentUser) {
				axios.post(`${url}/jwt?method=login`, userCredential)
			} else {
				axios.post(`${url}/jwt?method=logout`, userCredential)
			}
		})
		return () => unsubscribe();
	}, [user?.email])
	
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
	}
	return <AuthContext.Provider value={ authUtilities }>
		{ children }
	</AuthContext.Provider>
}

AuthProvider.propTypes = {
	children: PropTypes.node,
}
