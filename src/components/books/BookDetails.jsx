import { Rating } from "@mui/material";
import {useLoaderData, useParams} from "react-router-dom"
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function BookDetails() {
	const axiosSecure = useAxiosSecure();
	const book = useLoaderData()
	const id = useParams().id
	const { image, title, author, quantity: quan, category_name, rating, description } = book;
	const [ quantity, setQuantity ] = useState(quan);
	const { user } = useAuth();
	const { register, handleSubmit, formState: {errors} } = useForm();
	const currentDate = new Date().toISOString().split('T')[0];
	
	// const defaultDate = new Date();
	// const defaultDateValue = `${defaultDate.getFullYear()}-${(defaultDate.getMonth() + 1)
	// .toString()
	// .padStart(2, '0')}-${defaultDate.getDate().toString().padStart(2, '0')}`;
	const [borrowedBooks, setBorrowedBooks] = useState([]);
	useEffect(() => {
		axiosSecure.get(`/books/borrowed?email=${user.email}`)
			.then(res => setBorrowedBooks(res.data))
	}, [axiosSecure, user.email])
	
	const handleBorrowed = () => {
		const alreadyBorrowed = borrowedBooks.find(book => id === book._id);
		if(alreadyBorrowed) {
			Swal.fire({
				title: "Book already borrowed",
				confirmButtonText: "Ok",
				icon: "error",
			})
			return;
		}
		document.getElementById('my_modal_5').showModal()
	}
	
	const onSubmit = data => {
		document.getElementById('my_modal_5').close()
		if(quantity <= 0) Swal.fire({
			title: "Not available",
			icon: "warning",
			confirmButtonText: "Close",
		});
		
		const email = user.email;
		axiosSecure.patch(`/users/borrow?id=${id}&email=${email}`, data)
			.then(result => {
				const { modifiedCount, matchedCount } = result.data;
				if(modifiedCount === 0 && matchedCount === 1) {
					Swal.fire({
						title: "You already borrowed this book",
						confirmButtonText: "Close",
						icon: "warning",
					})
				}
				else if(modifiedCount === 1) {
					Swal.fire({
						title: "Book borrowed successfully",
						confirmButtonText: "Close",
						icon: "success",
					}).then(() => setQuantity(quantity -1))
				}
			})
	}
	const onError = err => {
		console.log(err)
	}
	
	return <div className="container space-y-12 mx-auto py-[70px]">
		<div className="md:flex gap-6">
			<div className="h-[500px] mx-auto shrink-0 rounded-lg max-w-[400px]">
				<img className="object-contain w-full h-full rounded-lg" src={ image }/>
			</div>
			<div className="p-4 grow space-y-12">
				<div className="text-center space-y-4">
					<h2 className="text-4xl">{ title }</h2>
					<p>{ description }</p>
					<hr className=""/>
				</div>
				<div className="items-center justify-around md:flex">
					<div className="h-full p-12 text-2xl grow space-y-6">
						<div className="text-center md:text-left">
							<p><span>Author:</span> <span>{ author }</span></p>
							<p><span>Category:</span> <span>{ category_name }</span></p>
							<div className="text-center md:text-left max-sm:mx-auto w-max space-y-3">
								<p>Rating: <span>{ rating }</span></p>
								<div className="relative right-2 rating rating-lg rating-half">
									<Rating name="rating" defaultValue={parseFloat(rating)} precision={0.5} size="large" readOnly/>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center space-y-4 grow">
						<div className="flex items-center justify-center gap-4">
							<p>Quantity: <span>{ quantity }</span></p>
						</div>
						<div>
							<button 
								className="btn btn-primary" 
								disabled={ (quantity > 0) ? false : true } 
								onClick={handleBorrowed}
							>Borrow</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		{/* Open the modal using document.getElementById('ID').showModal() method */}
		<div>
			<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="mx-auto text-lg font-bold w-max">Borrow {title}</h3>
					<div className="modal-action">
						<form method="dialog" onSubmit={ handleSubmit(onSubmit, onError) } className="mx-auto md:grid grid-cols-2 gap-5">
							<button type="button" onClick={ () => document.getElementById('my_modal_5').close() } className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
							
							{/* Username */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Name
									</span>
								</label>
								<input
									type="text"
									placeholder="Name"
									className="input input-bordered"
									defaultValue={ user.displayName }
									readOnly
								/>
							</div>
							
							{/* Email */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Email
									</span>
								</label>
								<input
									type="email"
									placeholder="Email"
									className="input input-bordered"
									defaultValue={ user.email }
									readOnly
								/>
							</div>
							
							{/* Current Date */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Borrowed Date
									</span>
								</label>
								<input 
									{ ...register("borrowed", { value: currentDate }) }
									type="date"
									placeholder="Borrowed in"
									className="input input-bordered"
									value={ currentDate }
									readOnly
								/>
							</div>
							
							{/* Return Date */}
							<div className="form-control">
								<label className="label">
									<span className="label-text">
										Return date
									</span>
								</label>
								<input 
									{ ...register("return") }
									type="date"
									placeholder="Return date"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="mx-auto mt-6 w-max col-span-2">
								<input type="submit" value="Borrow" className="btn btn-primary"/>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	</div>
}
