import { Swiper, SwiperSlide } from "swiper/react";
import banner from "../../assets/banner.jpg";
import sliderImg1 from "../../assets/slider1.png";
import sliderImg2 from "../../assets/slider2.png";
import sliderImg3 from "../../assets/slider3.png";
import libraryImg from "../../assets/library.jpg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./rawSwiper.css";

import { Parallax, Pagination, Navigation } from "swiper/modules";

export default function App() {
	return (
		<>
			<Swiper
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				speed={600}
				parallax={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Parallax, Pagination, Navigation]}
				className="mySwiper"
			>
				<div
					slot="container-start"
					className="relative parallax-bg"
					// style={{
					// 	"background-image": "../../assets/banner.jpg",
					// }}
					data-swiper-parallax="-23%"
				>
					<div className="absolute top-0 w-full h-full bg-black/60"></div>
					<img src={ banner } className="object-cover w-full h-full"/>
				</div>
				
				{/* Slide 1 */}
				<SwiperSlide>
					<div className="flex flex-col flex-col-reverse items-center justify-around h-full lg:flex-row">
						<div className="max-md:text-center shrink-0">
							<div className="md:text-[41px] md:font-[300] text-[24px]" data-swiper-parallax="-300">
								Discover the World of Books
							</div>
							<div className="md:text-[21px] max-md:w-max max-md:mx-auto" data-swiper-parallax="-200">
								Explore Endless Possibilities
							</div>
							<div className="md:text-[14px] text-center text-[13px] max-md:mx-auto md:text-left max-w-[240px] md:max-w-[400px] md:leading-[1.3]" data-swiper-parallax="-100">
								<p>
									Welcome to our library, where books open doors to new worlds. Discover a diverse collection of literature, from classics to contemporary bestsellers. Join us on a journey of knowledge and imagination.
								</p>
							</div>
						</div>
						<div className="flex items-center justify-right">
							<div className="max-h-[600px]">
								<img className="object-contain w-full max-h-[600px] md:max-h-[400px]" src={ sliderImg1 } />
							</div>
						</div>
					</div>
				</SwiperSlide>
				
				{/* Slide 2 */}
				<SwiperSlide>
					<div className="flex flex-row-reverse flex-col flex-col-reverse items-center justify-around h-full lg:flex-row">
						<div className="text-center shrink-0">
							<div className="md:text-[41px] md:font-[300] text-[24px]" data-swiper-parallax="-300">
								Library Beyond Boundaries
							</div>
							<div className="md:text-[21px] max-md:w-max max-md:mx-auto" data-swiper-parallax="-200">
							</div>
							<div className="md:text-[14px] text-center text-[13px] max-md:mx-auto md:text-left max-w-[240px] md:max-w-[400px] md:leading-[1.3]" data-swiper-parallax="-100">
								<p>
									Access a treasure trove of digital resources, e-books, audiobooks, and more. Our library extends its services into the digital realm, making knowledge and entertainment just a click away.
								</p>
							</div>
						</div>
						<div className="flex items-center justify-right">
							<div className="max-h-[600px]">
								<div className="relative flex items-center">
									<img className="z-20 object-contain w-full h-full" src={ sliderImg3 } />
									<div className="absolute w-[83.6%] h-[79.5%] left-[9.15%] top-[4.45%] z-10">
										<img className="object-cover w-full h-full" src={ libraryImg } />
									</div>
								</div>
							</div>
						</div>
					</div>
				</SwiperSlide>
				
				{/* Slide 3 */}
				<SwiperSlide>
					<div className="flex flex-col flex-col-reverse items-center justify-around h-full lg:flex-row">
						<div className="text-center shrink-0">
							<div className="md:text-[41px] md:font-[300] text-[24px]" data-swiper-parallax="-300">
								Connecting Through Stories
							</div>
							<div className="md:text-[21px] max-md:w-max max-md:mx-auto" data-swiper-parallax="-200">
							</div>
							<div className="md:text-[14px] text-center text-[13px] max-md:mx-auto md:text-left max-w-[240px] md:max-w-[400px] md:leading-[1.3]" data-swiper-parallax="-100">
								<p>
									Stay updated with our library events and engage with fellow book enthusiasts. From book clubs to author visits, there&apos;s always something happening. Join us in building a vibrant reading community.
								</p>
							</div>
						</div>
						<div className="flex items-center justify-right">
							<div className="max-h-[600px]">
								<img className="object-contain w-full max-h-[600px] md:max-h-[400px]" src={ sliderImg2 } />
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
