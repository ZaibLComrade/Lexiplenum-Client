import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Categories() {
	const [categories, setCategories] = useState([])
	const axiosSecure = useAxiosSecure();
	const [loading, setLoading] = useState(true);
	
	const skeleton = <div>
		<div role="status" className="animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
			<div className="flex items-center relative justify-center w-full h-[350px] bg-gray-300 rounded-2xl sm:w-96 dark:bg-gray-800">
				<div className="absolute text-center top-1/2 -translate-y-1/2">
					<div className="justify-center mb-8 w-[140px] h-4 bg-gray-200 rounded-2xl dark:bg-gray-600"></div>
					<div className="justify-center mx-auto w-[95px] h-[48px] bg-gray-200 rounded-lg dark:bg-gray-600"></div>
				</div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	</div>
	
	useEffect(() => {
		axiosSecure.get("/categories")
		.then(res => {
			setCategories(res.data)
			setLoading(false);
		});
	}, [axiosSecure])
	
	if(loading) return <div className="p-8 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{ [...Array(4).keys()].map(i => skeleton) }
		</div>
	</div>
	return <div className="p-8 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			{
				categories.length ? categories.map(categ => <div key={ categ._id }>
					<div className="shadow-xl rounded-2xl">
						<figure className="h-[350px] relative">
							<img src={ categ.image } className="object-cover w-full h-full rounded-2xl"/>
							<div className="absolute top-0 w-full h-full rounded-2xl bg-black/70"></div>
							<div className="absolute z-10 py-6 mx-auto text-2xl text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 font-lato w-max">
							<h3 className="mb-6 text-white">{ categ.category }</h3>
							<Link to={ `/books/${categ.id}`}><button className="btn btn-primary">Explore</button></Link>
							</div>
						</figure>
					</div>
				</div>)
				:
				<div className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2">No Categories Found</div>
			}
		</div>
	</div>
}
