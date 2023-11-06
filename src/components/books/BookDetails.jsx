import { Rating } from "@mui/material";
import {useLoaderData, useParams} from "react-router-dom"
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export default function BookDetails() {
	const axiosSecure = useAxiosSecure();
	const book = useLoaderData()
	const id = useParams().id
	const { image, title, author, quantity, category_name, rating, description } = book;
	const { user } = useAuth();
	
	const handleBorrow = e => {
		e.preventDefault();
		if(quantity <= 0) Swal.fire({
			title: "Not available",
			icon: "warning",
			confirmButtonText: "Close",
		});
		
		const email = user.email;
		axiosSecure.patch(`/users/borrow?id=${id}&email=${email}`)
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
					})
				}
			})
	}
	
	return <div className="container space-y-12 mx-auto py-[70px]">
		<div className="md:flex gap-6">
			<div className="h-[500px] mx-auto shrink-0 rounded-lg max-w-[400px]">
				<img className="object-cover w-full h-full rounded-lg" src={ image }/>
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
									<Rating name="rating" defaultValue={rating} precision={0.5} size="large" readOnly/>
								</div>
							</div>
						</div>
					</div>
					<div className="text-center space-y-4 grow">
						<div className="flex items-center justify-center gap-4">
							<p>Quantity: <span>{ quantity }</span></p>
						</div>
						{/* <div className="text-3xl"> */}
						{/* 	<p><span>Price:</span> <span>{ price } $</span></p> */}
						{/* </div> */}
						{/* <div> */}
						{/* 	<p className="text-2xl"> */}
						{/* 		<span>Total: </span> */}
						{/* 		<span>{ (quantity * price).toFixed(2) } $</span> */}
						{/* 	</p> */}
						{/* </div> */}
						<div>
							<button onClick={ handleBorrow } className="btn btn-primary">Borrow</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		{/* <div className="items-start grid grid-cols-2 gap-8"> */}
		{/* 	<div className="space-y-4"> */}
		{/* 		<h2 className="mx-auto text-3xl w-max">Ingredients</h2> */}
		{/* 		<p className="mx-auto text-center"> */}
		{/* 			<span>{ ingredients[0] }</span> */}
		{/* 		</p> */}
		{/* 	</div> */}
		{/* 	<div className="shrink-0"> */}
		{/* 		<div className="mx-auto space-y-4 max-w-[400px]"> */}
		{/* 			<h2 className="mx-auto text-3xl w-max">Nutrition Facts</h2> */}
		{/* 			<ol className="mx-auto list-disc grid grid-cols-1 md:grid-cols-2"> */}
		{/* 				{ */}
		{/* 					nutrition_facts.map((elem, idx) => <li key={ idx }> */}
		{/* 						{ elem } */}
		{/* 					</li>) */}
		{/* 				} */}
		{/* 			</ol> */}
		{/* 		</div> */}
		{/* 	</div> */}
		{/* </div> */}
	</div>
}
