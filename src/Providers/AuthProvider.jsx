import { createContext, useEffect, useState } from "react";
import { 
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const unsubscribe = 
	}, [])
	
	const authUtilities = {}
	return <AuthContext.Provider value={ authUtilities }>
	</AuthContext.Provider>
}
