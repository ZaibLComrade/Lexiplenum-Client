import {useEffect, useState} from "react";
import {useLoaderData} from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import BorrowedBookCard from "./BorrowedBookCard";

export default function BorrowedBooks() {
	const [borrowed, setBorrowed] = useState(useLoaderData());
	const { user } = useAuth()
	const axiosSecure = useAxiosSecure();
	
	const email = user.email;
	useEffect(() => {
		if(email) {
			axiosSecure.get(`/books/borrowed?email=${email}`)
				.then(res => setBorrowed(res.data))
		}
	}, [axiosSecure, email])
	
	const handleReturn = id => {
		axiosSecure.delete(`/users/return?email=${email}&book_id=${id}`, )
			.then(result => {
				if(result.data.acknowledged) {
					Swal.fire({
						title: "Successfully returned book",
						icon: "success",
						confirmButtonText: "Close",
					}).then(() => {
						axiosSecure.get(`/books/borrowed?email=${email}`)
							.then(res => setBorrowed(res.data))
					})
				}
			});
	}
	
	return <div className="container mx-auto min-h-[100vh] lg:flex max-lg:space-y-8 px-4 flex-row-reverse gap-4 py-[70px]">
		<div className="bg-neutral/20 rounded-xl grow">
			{
				borrowed && borrowed.map(book => <BorrowedBookCard 
					key={ book._id } 
					book={ book }
					handleReturn={ handleReturn }
				/>)
			}
		</div>
	</div>
}
