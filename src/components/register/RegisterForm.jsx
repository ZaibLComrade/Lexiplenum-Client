import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

const validatePassword = (password) => {
	const minLength = 6;
	const lengthExp = new RegExp(`^.{1,${minLength}}$`);
	const capitalExp = /[A-Z]/;
	const specialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
	
	if (lengthExp.test(password)) {
		Swal.fire({
			title: "Password is too short",
			text: "Password length must be more than 6 characters",
			icon: "warning",
			confirmButtonText: "close",
		});
		return false;
	}
	if (!capitalExp.test(password)) {
		Swal.fire({
			title: "Does not contain capital letters",
			text: "Password must contain at least 1 capital letter",
			icon: "warning",
			confirmButtonText: "close",
		});
		return false;
	}
	if (!specialChar.test(password)) {
		Swal.fire({
			title: "Does not contain special characters",
			text: "Password must contain at least 1 special character",
			icon: "warning",
			confirmButtonText: "close",
		});
		return false;
	}
	return true;
};

export default function RegisterForm() {
	const axiosSecure = useAxiosSecure();
	// Getting customized firebase functions from context
	const { registerUser, logoutUser, loginUser, updateProfile, setLoading, setUser } = useAuth();
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm();
	
	const onSubmit = newUser => {
		const { name, email, password, image } = newUser;
		
		if(!validatePassword(password)) return;
		const userProfile = {
			displayName: name,
			photoURL: image,
		};
		
		registerUser(email, password)
			.then((userCredential) => {
				updateProfile(userCredential.user, userProfile).then(() => {
					const user = userCredential.user;
					const userData = {
						name: user.displayName,
						image: user.photoURL,
						email: user.email,
						role: "user",
						creationTime: user?.metadata?.creationTime,
						lastSignInTime: user?.metadata?.lastSignInTime,
						borrowed: [],
					}
					setUser(userCredential.user);
					axiosSecure.post(`/users`, userData)
					
					logoutUser();
					loginUser(email, password)
				});
				
				Swal.fire({
					title: "Successfully registered user",
					icon: "success",
					confirmButtonText: "Continue",
				}).then(() => {
					navigate("/");
				});
				setLoading(false);
			})
			.catch((err) => {
				if (err.code === "auth/email-already-in-use")
					Swal.fire({
						title: "Email is already in use",
						icon: "error",
						confirmButtonText: "Close",
					});
				setLoading(false);
			});
	}
	
	const onError = () => {
		Swal.fire({
			title: "Please fill all the required fields",
			icon: "error",
			confirmButtonText: "Ok",
		})
	}
	
	return (
		<div>
			<div className="flex-shrink-0 w-full max-w-sm pb-5 mx-auto shadow-2xl font-montserrat card bg-base-100">
				<form className="card-body" onSubmit={handleSubmit(onSubmit, onError)}>
					<h1 className="mx-auto text-3xl font-semibold w-max font-playfair-display">
						Register
					</h1>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Name{" "}
								<span className="relative text-red-500 top-[3.5px]">
									*
								</span>
							</span>
						</label>
						<input
							{...register("name", {requried: true})}
							type="text"
							placeholder="name"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Photo URL</span>
						</label>
						<input
							{...register("image")}
							type="url"
							placeholder="url"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Email{" "}
								<span className="relative text-red-500 top-[3.5px]">
									*
								</span>
							</span>
						</label>
						<input
							{...register("email", { required: true })}
							type="email"
							placeholder="email"
							className="input input-bordered"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Password{" "}
								<span className="relative text-red-500 top-[3.5px]">
									*
								</span>
							</span>
						</label>
						<input
							{...register("password", { required: true })}
							type="password"
							placeholder="password"
							className="input input-bordered"
						/>
					</div>
					<div className="mt-6 form-control">
						<button className="btn btn-primary">Sign Up</button>
					</div>
				</form>
				<div className="mx-auto text-sm text-center md:text-base">
					<p>
						Already registered?{" "}
						<Link
							className="text-blue-600 underline hover:text-blue-500"
							to="/login"
						>
							Login
						</Link>{" "}
						here
					</p>
				</div>
			</div>
		</div>
	);
}
