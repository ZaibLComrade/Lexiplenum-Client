import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Categories() {
	const [categories, setCategories] = useState([])
	const axiosSecure = useAxiosSecure();
	
	useEffect(() => {
		axiosSecure.get("/books/categories")
			.then(res => setCategories(res.data));
	}, [axiosSecure])
	
	return <div className="p-4 mx-auto space-y-12">
		<div className="mx-auto w-max"><span className="text-6xl font-raleway">Categories</span></div>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{
				categories.length ? categories.map(categ => <div key={ categ._id }>
					<Link className="shadow-xl hover:shadow-2xl rounded-2xl">
						<figure className="h-[350px] border">
							{/* <img src={ brand.brand_img } className="object-cover w-full h-full rounded-2xl"/> */}
						</figure>
						<h2 className="py-6 mx-auto text-2xl font-lato w-max">{ categ.category }</h2>
					</Link>
				</div>)
				:
				<div>No Categories Found</div>
			}
		</div>
	</div>
}
