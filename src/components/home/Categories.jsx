import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Categories() {
	const [categories, setCategories] = useState([])
	const axiosSecure = useAxiosSecure();
	
	useEffect(() => {
		axiosSecure.get("/categories")
			.then(res => setCategories(res.data));
	}, [axiosSecure])
	
	return <div className="p-4 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
				<div>No Categories Found</div>
			}
		</div>
	</div>
}
