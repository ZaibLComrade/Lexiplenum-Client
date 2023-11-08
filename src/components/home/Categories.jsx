import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Categories() {
	const [categories, setCategories] = useState([])
	const axiosSecure = useAxiosSecure();
	const [loading, setLoading] = useState(true);
	
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
		axiosSecure.get("/categories")
		.then(res => {
			setCategories(res.data)
			setLoading(false);
		});
	}, [axiosSecure])
	
	if(loading) return <div className="p-8 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
			{ skeleton }
			{ skeleton }
			{ skeleton }
		</div>
	</div>
	return <div className="p-8 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
			{
				categories.length ? categories.map(categ => <div key={ categ._id }>
					<div className="shadow-xl rounded-2xl">
						<figure className="h-[350px] relative">
							<img src={ categ.image } className="object-cover w-full h-full rounded-2xl"/>
							<div className="absolute top-0 w-full h-full rounded-2xl bg-black/70"></div>
							<div className="absolute z-10 py-6 mx-auto text-2xl text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 font-lato w-max">
							<h3 className="mb-6">{ categ.category }</h3>
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
