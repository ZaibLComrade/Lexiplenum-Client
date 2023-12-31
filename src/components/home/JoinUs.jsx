import communityImg from "../../assets/community.jpg";

export default function JoinUs() {
  return (
    <div className="relative bg-neutral">
      <div className="relative overflow-hidden bg-primary h-80 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <img
          className="object-cover w-full h-full"
          src={ communityImg }
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#776FFF" />
              <stop offset={1} stopColor="#FF4694" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative py-24 mx-auto max-w-7xl sm:py-32 lg:py-40 lg:px-8">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <h2 className="text-base font-semibold text-primary leading-7">Meet new people</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight">Join our community</p>
          <p className="mt-6 text-base leading-7">
            Joining our community is your gateway to a world of connection, shared passions, and endless possibilities. As a member, you'll have the opportunity to engage with fellow enthusiasts, access exclusive events, and contribute to our vibrant library ecosystem. Embrace the sense of belonging, collaboration, and the joy of shared experiences. Join the community and become a valued part of our literary family.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="btn btn-accent"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

