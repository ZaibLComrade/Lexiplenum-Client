import { Rating } from "@mui/material";
import {useEffect, useState} from "react";
import {useLoaderData, useLocation, Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingScreen from "../LoadingScreen";

export default function CategoryBooks() {
	const axiosSecure = useAxiosSecure();
	const books = useLoaderData();
	const [category, setCategory] = useState("")
	const location = useLocation();
	const locationArr = location.pathname.split('/');
	const id = locationArr[locationArr.length - 1];
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	
	const skeleton = <div>
<div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
    <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
	</div>
	
	useEffect(() => {
		axiosSecure.get(`/categories/${id}`)
			.then(res => {
				setCategory(res.data)
				setLoading(false);
			})
	}, [axiosSecure, id, user.email])
	
	if(loading) return <div className="py-[50px]">
		<h1 className="mx-auto text-5xl font-playfair w-max">All Books</h1> 
		<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			{ skeleton }
			{ skeleton }
			{ skeleton }
			{ skeleton }
		</div>
	</div>
	return <div className="space-y-16">
		<div className="space-y-6">
			<h1 className="mx-auto text-5xl font-playfair w-max">{ category } Books</h1>
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
