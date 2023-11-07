import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import {useEffect, useState} from "react";

export default function AddBooks() {
	const [categories, setCategories] = useState([])
	const axiosSecure = useAxiosSecure();
	const { register, handleSubmit, formState: { errors } } = useForm();
	
	useEffect(() => {
		axiosSecure.get("/categories")
			.then(res => setCategories(res.data));
	}, [axiosSecure])
	
	const onSubmit = newBook => {
		axiosSecure.post("/books", newBook)
			.then(res => {
				if(res.data.acknowledged) {
					Swal.fire({
						title: 'Added!',
						text: 'Item has been added successfully',
						icon: 'success',
						confirmButtonText: 'Cool'
					})
				}
			})
	};
	const onError = errors => {
		Swal.fire({
			title: "Please fill the required fields",
			icon: "error",
			confirmButtonText: "Ok",
		})
	};
	
	return <div className="container mx-auto py-[70px] space-y-6">
		<h1 className="mx-auto text-5xl w-max">Add Book</h1>
		<div className="mb-[120px] bg-custom-white-1">
			<form onSubmit={ handleSubmit(onSubmit, onError) } className="p-6 mx-auto md:w-[70%] gap-4 grid grid-cols-1 md:grid-cols-2">
				{/* Book Name */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Book Name (Required)</span>
					</label>
					<input {...register("title", { required: true })} type="text" placeholder="Enter book name" className=" input input-bordered"/>
				</div>
				
				{/* Author Name */}
				<div className=" form-control">
					<label className="label">
						<span className="label-text">Author Name (Required)</span>
					</label>
					<input {...register("author", { required: true })} type="text" placeholder="Enter author name" className=" input input-bordered"/>
				</div>
				
				{/* Quantity */}
				<div className=" form-control">
					<label className="label">
						<span className="label-text">Quantity</span>
					</label>
					<input {...register("quantity")} onChange={ e => {if(e.target.value < 0) e.target.value = 0} } defaultValue="0" placeholder="Quantity" type="number" className=" input input-bordered"/>
				</div>
				
				{/* Rating */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Rating</span>
					</label>
					<select {...register("rating")} className="input-bordered input">
						<option value="0">0</option>
						<option value="0.5">0.5</option>
						<option value="1.0">1.0</option>
						<option value="1.5">1.5</option>
						<option value="2.0">2.0</option>
						<option value="2.5">2.5</option>
						<option value="3.0">3.0</option>
						<option value="3.5">3.5</option>
						<option value="4.0">4.0</option>
						<option value="4.5">4.5</option>
						<option value="5.0">5.0</option>
					</select>
				</div>
				
				<div className="col-span-1 space-y-4 md:col-span-2">
					{/* Category */}
					<div className="w-full form-control">
						<label className="label">
							<span className="label-text" required>Category</span>
						</label>
						<select {...register("category")} className="input-bordered input">
							{
								categories.map(categ => <option key={categ._id} value={ categ.id }>{categ.category}</option>)
							}
						</select>
					</div>
					
					{/* Short Description */}
					<div className="w-full form-control">
						<label className="label">
							<span className="label-text">Short Description (Required)</span>
						</label>
						<textarea {...register("description", { required: true })} type="text" placeholder="Short description" className="w-full pl-4 pt-2 h-[80px] input input-bordered"/>
					</div>
					
					{/* Photo */}
					<div className="w-full form-control">
						<label className="label">
							<span className="label-text">Photo</span>
						</label>
						<input {...register("image")} type="text" placeholder="Enter photo URL" className="w-full input input-bordered"/>
					</div>
				</div>
				
				{errors.exampleRequired && <span>This field is required</span>}
				{/* Submit */}
				<div className="mx-auto mt-6 w-max col-span-1 md:col-span-2">
					<input type="submit" value="Add Book" className="w-full btn hover:bg-custom-white-2 border-custom-coffee-2 bg-custom-coffee-1 input-bordered"/>
				</div>
			</form>
		</div>
	</div>
}
