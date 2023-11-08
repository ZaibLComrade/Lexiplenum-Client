import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { usePDF } from "react-to-pdf";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Read() {
	const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
	const [content, setContent] = useState(``);
	const axiosSecure = useAxiosSecure();
	const id = useParams().id;
	
	useEffect(() => {
		axiosSecure.get(`/book/content?id=${id}`)
			.then(res => {
				setContent(res.data);
			})
	}, [axiosSecure, id])
	
	return (
		<div className="py-[50px] space-y-8">
			<h1 className="mx-auto text-5xl w-max">A breif glance</h1>
			<div className="flex h-[90vh]">
				<div className="p-6 shrink-0">
					<img src={ content.image } className="object-contain w-full h-full"/>
				</div>
				<div className="py-[50px] overflow-y-scroll">
					<button className="btn btn-primary" onClick={() => toPDF()}>Download PDF</button>
					<h1 className="m-auto text-3xl w-max">{ content.title }</h1>
					<div ref={targetRef} className="p-8">
						<pre style={ { whiteSpace: "pre-wrap"} }>{ `${content.content}` }</pre>
					</div>
				</div>
			</div>
		</div>
	)
}
