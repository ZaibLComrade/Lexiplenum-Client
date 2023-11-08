import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function BorrowedBookCard({ book, handleReturn }) {
	const [dates, setDates] = useState({});
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const email = user.email;
	console.log(dates.borrowed, dates.return);
	useEffect(() => {
		axiosSecure.get(`/borrowed-dates?email=${email}`)
			.then(res => {
				const date = res.data.find(elem => elem.id === book._id)
				setDates(date)
			});
	}, [axiosSecure, email, book._id])
	
	return <>
<div key={ book._id }>
					<div className="p-4 grid-cols-1 md:grid-cols-3 grid">
						<div className="items-center text-center col-span-2 md:flex justify between lg:text-left ">
							
							<div className="md:w-[250px] max-md:mx-auto shrink-0 h-[250px] p-4 rounded-lg">
								<img src={ book.image } className="object-contain w-full h-full rounded-lg"/>
							</div>
							<div className="flex flex-col justify-between p-4 lg:h-full gap-6">
								<div>
									<h3><span>Name:</span> <span>{ book.title }</span></h3>
									<p><span>Author:</span> <span>{ book.author }</span></p>
									<p><span>Category:</span> <span>{ book.category_name }</span></p>
									<p><span>Borrowed Date:</span> <span>{ dates.borrowed }</span></p>
									<p><span>Return Date:</span> <span>{ dates.return }</span></p>
								</div>
					<div className="flex items-center justify-center h-full text-lg">
						<div className="text-center">
							<button onClick={() => handleReturn(book._id)} className="mt-4 btn">Return</button>
						</div>
					</div>
							</div>
						</div>
					</div>
				</div>
	</>
}

BorrowedBookCard.propTypes = {
	book: PropTypes.object,
	handleReturn: PropTypes.func,
}
