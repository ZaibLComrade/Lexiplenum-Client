import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {useState} from "react";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function LoginForm() {
	const { loginUser, googleSignInUser, user, setLoading } = useAuth();
	const [tempEmail, setTempEmail] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const axiosSecure = useAxiosSecure();
	
	const handleSubmit = (e) => {
		e.preventDefault(); 
		
		const form = new FormData(e.currentTarget);
		const email = form.get("email");
		const password = form.get("password");
		if (email === user?.email) {
			Swal.fire({
				title: "User already logged in",
				icon: "warning",
				confirmButtonText: "Close",
			}).then(() => {
				navigate("/");
			});
			return;
		}
		
		loginUser(email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				const update = {lastSignInTime: user?.metadata?.lastSignInTime};
				axiosSecure.put(`/users/${user.email}`, update);
				
				if(location.state === "/cart/null") {
					setLoading(true);
					axiosSecure.get(`/users/${user.email}`)
						.then(res => {
							location.state = `/cart/${res.data}`;
							Swal.fire({
								title: "Successfully logged in",
								icon: "success",
								confirmButtonText: "Continue",
							}).then(() => {
								navigate(location.state);
								setLoading(false);
							});
						});
				} else {
					Swal.fire({
						title: "Successfully logged in",
						icon: "success",
						confirmButtonText: "Continue",
					}).then(() => {
						navigate(location?.state || "/");
						setLoading(false);
					});
				}
			})
			.catch((err) => {
					if(err.code === "auth/invalid-login-credentials") {
						Swal.fire({
							title: "Invalid Credentials",
							icon: "error",
							confirmButtonText: "Close",
						}).then(() => {
							setLoading(false);
						});
					} else if(err.code === "auth/too-many-requests") {
						Swal.fire({
							title: "Account has been temporarily disabled",
							text: "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
							icon: "error",
							confirmButtonText: "Close",
						}).then(() => {
							setLoading(false);
						});
					}
			});
	};
	
	const handleGoogleSignIn = e => {
		e.preventDefault();
		googleSignInUser()
			.then((result) => {
				const user = result.user;
				axiosSecure.put(`/users/${user.email}`, {
					name: user.displayName,
					image: user.photoURL,
					email: user.email,
					role: "user",
					creationTime: user?.metadata?.creationTime,
					lastSignInTime: user?.metadata?.lastSignInTime,
					borrowed: [],
				});
				
				if(location.state === "/cart/null") {
					axiosSecure.get(`/users/${user.email}`)
						.then(res => {
							Swal.fire({
								title: "Successfully logged in",
								icon: "success",
								confirmButtonText: "Continue",
							}).then(() => {
								navigate(`/cart/${res.data}`);
								setLoading(false);
							});
						});
				} else {
					Swal.fire({
						title: "Successfully logged in",
						icon: "success",
						confirmButtonText: "Continue",
					}).then(() => {
						navigate(location?.state || "/");
						setLoading(false);
					});
				}
			})
			.catch(err => console.error(err));
	}
	
	return (
		<div>
			{location.state && (
				<div className="mx-auto mb-6 h-max w-max">
					<h1 className="md:text-5xl font-montserrat font-semibold text-white text-2xl leading-[80px]">
						Login To Continue
					</h1>
				</div>
			)}
			<div className="flex-shrink-0 w-full max-w-sm pb-5 mx-auto border-red-500 shadow-2xl font-montserrat card bg-base-100">
				<form className="card-body" onSubmit={handleSubmit}>
					<h1 className="mx-auto text-3xl font-semibold w-max font-playfair-display">
						Login
					</h1>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							placeholder="email"
							name="email"
							className="input input-bordered"
							required
							onChange={ e => setTempEmail(e.target.value) }
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="password"
							name="password"
							className="input input-bordered"
							required
						/>
						<label className="label">
							<a
								href="#"
								className="label-text-alt link link-hover"
							>
								Forgot password?
							</a>
						</label>
					</div>
					<div className="mt-6 form-control">
						<button className="btn btn-primary">Login</button>
					</div>
				</form>
				<div className="w-full px-8 mx-auto mb-4 text-center">
					<hr className="w-full border"/>
					<p className="relative w-8 mx-auto font-bold bg-base-100 -top-3"> Or</p>
					<button onClick={ handleGoogleSignIn } className="flex items-center w-full btn btn-accent gap-2"><FcGoogle className="text-xl"/><div>Login with Google</div></button>
				</div>
				<div className="mx-auto text-sm text-center md:text-base">
					<p>
						Don&apos;t have an account?{" "}
						<Link
							className="text-blue-600 underline hover:text-blue-500"
							to="/register"
						>
							Register
						</Link>{" "}
						here
					</p>
				</div>
			</div>
		</div>
	);
}
