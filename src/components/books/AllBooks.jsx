import { Rating } from "@mui/material";
import {useEffect, useState} from "react";
import {useLoaderData, useLocation, Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AllBooks() {
	const axiosSecure = useAxiosSecure();
	const [books, setBooks] = useState(useLoaderData() || []);
	const [category, setCategory] = useState("")
	const location = useLocation();
	const locationArr = location.pathname.split('/');
	const id = locationArr[locationArr.length - 1];
	const { user } = useAuth();
	
	useEffect(() => {
		if(id === "all") {
			axiosSecure.get(`/books?email=${user.email}`)
				.then(res => setBooks(res.data));
		}
		axiosSecure.get(`/categories/${id}`)
			.then(res => setCategory(res.data))
	}, [axiosSecure, id, user.email])
	
	return <div className="space-y-16">
		<div className="space-y-6">
			{
				(location.pathname === "/books/all") ? <h1 className="mx-auto text-5xl font-playfair w-max">All Books</h1> 
				: 
				<h1 className="mx-auto text-5xl font-playfair w-max">{ category } Books</h1>
			}
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				{
					books.length ? books.map(book => <div key={ book._id } className="items-center text-center grid grid-cols-1 md:grid-cols-2 lg:text-left rounded-xl bg-neutral/70">
						<div className="w-full p-4 rounded-lg h-max">
							<img src={ book.image } className="object-contain w-full h-full rounded-lg"/>
						</div>
						<div className="flex flex-col justify-between p-4 text-white font-lato lg:h-full gap-6">
								<div>
								<h3 className="text-xl font-semibold font-montserrat"><span>Name:</span> <span>{ book.title }</span></h3>
								<p><span>Author:</span> <span>{ book.author }</span></p>
									<p><span>Category:</span> <span>{ book.category_name }</span></p>
								<Rating name="rating" defaultValue={parseFloat(book.rating)} precision={0.5} size="large" readOnly/>
								<p><span>Description:</span> <span>{ book.description }</span></p>
								</div>
								<div className="flex normal-case font-montserrat justify-evenly">
									<Link to={`/books/details/${book._id}`}>
										<button className="btn btn-primary">Details</button>
									</Link>
									<Link to={`/books/update/${book._id}`}>
										<button className="btn btn-primary">Update</button>
									</Link>
								</div>
							</div>
					</div>) :
					<div className="mx-auto h-[50vh] relative col-span-2 w-max">
						<p className="text-3xl">Books not available. Please try again later</p>
					</div>
				}
			</div>
		</div>
	</div>
}
