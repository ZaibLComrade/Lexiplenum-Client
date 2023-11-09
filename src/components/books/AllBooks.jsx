import { Rating } from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AllBooks() {
	const axiosSecure = useAxiosSecure();
	const [books, setBooks] = useState([]);
	const [toggleFilter, setToggleFilter] = useState(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	
	const skeleton = <div>
		<div role="status" className="p-4 border border-gray-200 shadow gap-8 grid md:grid-cols-2 rounded-xl animate-pulse md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-center h-[300px] mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
        </svg>
    </div>
	<div className="flex flex-col justify-between p-4">
		<div>
			<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
			<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
			<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
			<div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
			<div className="flex items-center mt-4 space-x-3">
				<div>
					<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
					<div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
				</div>
			</div>
		</div>
		<div className="grid grid-cols-2 gap-6">
			<div className="h-[50px] bg-gray-300 rounded-lg dark:bg-gray-700"></div>
			<div className="h-[50px] bg-gray-300 rounded-lg dark:bg-gray-700"></div>
		</div>
	</div>
    <span className="sr-only">Loading...</span>
</div>
	</div>
	
	useEffect(() => {
		axiosSecure.get(`/books?email=${user.email}&filter=${toggleFilter}`)
			.then(res => {
				setBooks(res.data);
				setLoading(false);
			});
	}, [axiosSecure, user.email, toggleFilter])
	
	if(loading) return <div className="py-[50px] space-y-6">
		<h1 className="mx-auto text-5xl font-playfair w-max">All Books</h1> 
			<button 
				className="block mx-auto btn btn-primary" 
				disabled
			>
				{ toggleFilter ? "Show All Books" : "Show Available Books" }
			</button>
		<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
			{[...Array(4).keys()].map(i =>  skeleton )}
		</div>
	</div>
	return <div className="space-y-16 py-[50px]">

		<div className="space-y-6">
			<h1 className="mx-auto text-5xl font-playfair w-max">All Books</h1> 
			<button 
				className="block mx-auto btn btn-primary" 
				onClick={ () => { setToggleFilter(!toggleFilter); setLoading(true) } }
			>
				{ toggleFilter ? "Show All Books" : "Show Available Books" }
			</button>
			<div className="container p-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
				{
					books.length ? books.map(book => <div key={ book._id } className="items-center text-center p-7 grid grid-cols-1 md:grid-cols-2 lg:text-left rounded-xl bg-neutral">
						<div className="w-full h-[300px] p-4 rounded-lg r">
							<img src={ book.image } className="object-contain w-full h-full rounded-lg"/>
						</div>
						<div className="flex flex-col justify-between p-4 font-lato lg:h-full gap-6">
								<div>
									<h3 className="text-xl font-semibold font-montserrat"><span>Name:</span> <span>{ book.title }</span></h3>
									<p><span>Author:</span> <span>{ book.author }</span></p>
										<p><span>Category:</span> <span>{ book.category_name }</span></p>
									<Rating name="rating" defaultValue={parseFloat(book.rating)} precision={0.5} size="large" readOnly/>
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
