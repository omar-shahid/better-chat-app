import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import MainLayout from "../../common/layouts/Main";
import coverImage from "./../../assets/images/cover.jpeg";

interface Props {}

const Home: React.FC<Props> = () => {
  const features = [
    {
      name: "Competitive exchange rates",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: GlobeAltIcon,
    },
    {
      name: "No hidden fees",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: ScaleIcon,
    },
    {
      name: "Transfers are instant",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: LightningBoltIcon,
    },
    {
      name: "Mobile notifications",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
      icon: AnnotationIcon,
    },
  ];
  return (
    <>
      <MainLayout title="home">
        <div className="relative overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div>
                <div className="relative px-4 pt-6 sm:px-6 lg:px-8" />
                {/*

                            Mobile menu, show/hide based on menu open state.

                            Entering: "duration-150 ease-out"
                              From: "opacity-0 scale-95"
                              To: "opacity-100 scale-100"
                            Leaving: "duration-100 ease-in"
                              From: "opacity-100 scale-100"
                              To: "opacity-0 scale-95"
                  */}
              </div>

              <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Get in touch with</span>
                    <span className="block text-indigo-600 xl:inline">
                      {" "}
                      This App!
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/register"
                        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Register Now!
                      </Link>
                    </div>
                    {/* <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href="#"
                          className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                        >
                          Live demo
                        </a>
                      </div> */}
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={coverImage}
              alt=""
            />
          </div>
        </div>

        <div className="bg-gray-50">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-indigo-600">
                Start your free trial today.
              </span>
            </h2>
            <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Get started
                </Link>
              </div>
              <div className="inline-flex ml-3 rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-100">
          <div className="flex flex-wrap justify-center max-w-6xl m-auto text-gray-800">
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Home
              </div>
              <a className="block my-3" href="/#">
                Services <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Products <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                About Us <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Pricing <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Partners <span className="p-1 text-xs text-teal-600">New</span>
              </a>
            </div>
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                User
              </div>
              <a className="block my-3" href="/#">
                Sign in <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                New Account <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Demo <span className="p-1 text-xs text-teal-600">New</span>
              </a>
              <a className="block my-3" href="/#">
                Career{" "}
                <span className="p-1 text-xs text-teal-600">We're hiring</span>
              </a>
              <a className="block my-3" href="/#">
                Surveys <span className="p-1 text-xs text-teal-600">New</span>
              </a>
            </div>
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Resources
              </div>
              <a className="block my-3" href="/#">
                Documentation{" "}
                <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Tutorials <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Support <span className="p-1 text-xs text-teal-600">New</span>
              </a>
            </div>
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Product
              </div>
              <a className="block my-3" href="/#">
                Our Products <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Great Deals{" "}
                <span className="p-1 text-xs text-teal-600">New</span>
              </a>
              <a className="block my-3" href="/#">
                Analytics <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Mobile <span className="p-1 text-xs text-teal-600"></span>
              </a>
            </div>
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Support
              </div>
              <a className="block my-3" href="/#">
                Help Center <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Privacy Policy{" "}
                <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                Conditions <span className="p-1 text-xs text-teal-600"></span>
              </a>
            </div>
            <div className="w-48 p-5 ">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Contact us
              </div>
              <a className="block my-3" href="/#">
                XXX XXXX, Floor 4 San Francisco, CA{" "}
                <span className="p-1 text-xs text-teal-600"></span>
              </a>
              <a className="block my-3" href="/#">
                contact@company.com{" "}
                <span className="p-1 text-xs text-teal-600"></span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-100">
            <div className="flex flex-wrap justify-center max-w-6xl m-auto text-gray-800">
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Home
                </div>
                <a className="block my-3" href="/#">
                  Services <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Products <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  About Us <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Pricing <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Partners{" "}
                  <span className="p-1 text-xs text-teal-600">New</span>
                </a>
              </div>
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  User
                </div>
                <a className="block my-3" href="/#">
                  Sign in <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  New Account <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Demo <span className="p-1 text-xs text-teal-600">New</span>
                </a>
                <a className="block my-3" href="/#">
                  Career{" "}
                  <span className="p-1 text-xs text-teal-600">
                    We're hiring
                  </span>
                </a>
                <a className="block my-3" href="/#">
                  Surveys <span className="p-1 text-xs text-teal-600">New</span>
                </a>
              </div>
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Resources
                </div>
                <a className="block my-3" href="/#">
                  Documentation <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Tutorials <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Support <span className="p-1 text-xs text-teal-600">New</span>
                </a>
              </div>
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Product
                </div>
                <a className="block my-3" href="/#">
                  Our Products <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Great Deals{" "}
                  <span className="p-1 text-xs text-teal-600">New</span>
                </a>
                <a className="block my-3" href="/#">
                  Analytics <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Mobile <span className="p-1 text-xs text-teal-600" />
                </a>
              </div>
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Support
                </div>
                <a className="block my-3" href="/#">
                  Help Center <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Privacy Policy <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  Conditions <span className="p-1 text-xs text-teal-600" />
                </a>
              </div>
              <div className="w-48 p-5 ">
                <div className="text-xs font-medium text-gray-500 uppercase">
                  Contact us
                </div>
                <a className="block my-3" href="/#">
                  XXX XXXX, Floor 4 San Francisco, CA{" "}
                  <span className="p-1 text-xs text-teal-600" />
                </a>
                <a className="block my-3" href="/#">
                  contact@company.com{" "}
                  <span className="p-1 text-xs text-teal-600" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-2 bg-gray-100 ">
            <div className="flex flex-col max-w-6xl px-3 pt-5 pb-5 m-auto text-sm text-gray-800 border-t md:flex-row">
              <div className="mt-2">© Copyright 2020. All Rights Reserved.</div>
              <div className="flex flex-row mt-2 md:flex-auto md:flex-row-reverse">
                <a href="/#" className="w-6 mx-1">
                  <svg
                    className="text-gray-500 cursor-pointer fill-current hover:text-gray-400"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      id="Twitter"
                      d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
            5.373,-12 12,-12c6.627,0 12,5.373 12,12Zm-6.465,-3.192c-0.379,0.168
            -0.786,0.281 -1.213,0.333c0.436,-0.262 0.771,-0.676
            0.929,-1.169c-0.408,0.242 -0.86,0.418 -1.341,0.513c-0.385,-0.411
            -0.934,-0.667 -1.541,-0.667c-1.167,0 -2.112,0.945 -2.112,2.111c0,0.166
            0.018,0.327 0.054,0.482c-1.754,-0.088 -3.31,-0.929
            -4.352,-2.206c-0.181,0.311 -0.286,0.674 -0.286,1.061c0,0.733 0.373,1.379
            0.94,1.757c-0.346,-0.01 -0.672,-0.106 -0.956,-0.264c-0.001,0.009
            -0.001,0.018 -0.001,0.027c0,1.023 0.728,1.877 1.694,2.07c-0.177,0.049
            -0.364,0.075 -0.556,0.075c-0.137,0 -0.269,-0.014 -0.397,-0.038c0.268,0.838
            1.048,1.449 1.972,1.466c-0.723,0.566 -1.633,0.904 -2.622,0.904c-0.171,0
            -0.339,-0.01 -0.504,-0.03c0.934,0.599 2.044,0.949 3.237,0.949c3.883,0
            6.007,-3.217 6.007,-6.008c0,-0.091 -0.002,-0.183 -0.006,-0.273c0.413,-0.298
            0.771,-0.67 1.054,-1.093Z"
                    />
                  </svg>
                </a>
                <a href="/#" className="w-6 mx-1">
                  <svg
                    className="text-gray-500 cursor-pointer fill-current hover:text-gray-400"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      id="Facebook"
                      d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
            5.373,-12 12,-12c6.627,0 12,5.373
            12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422
            0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784
            -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
                    />
                  </svg>
                </a>
                <a href="/#" className="w-6 mx-1">
                  <svg
                    className="text-gray-500 cursor-pointer fill-current hover:text-gray-400"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <g id="Layer_1">
                      <circle id="Oval" cx={12} cy={12} r={12} />
                      <path
                        id="Shape"
                        d="M19.05,8.362c0,-0.062 0,-0.125 -0.063,-0.187l0,-0.063c-0.187,-0.562
               -0.687,-0.937 -1.312,-0.937l0.125,0c0,0 -2.438,-0.375 -5.75,-0.375c-3.25,0
               -5.75,0.375 -5.75,0.375l0.125,0c-0.625,0 -1.125,0.375
               -1.313,0.937l0,0.063c0,0.062 0,0.125 -0.062,0.187c-0.063,0.625 -0.25,1.938
               -0.25,3.438c0,1.5 0.187,2.812 0.25,3.437c0,0.063 0,0.125
               0.062,0.188l0,0.062c0.188,0.563 0.688,0.938 1.313,0.938l-0.125,0c0,0
               2.437,0.375 5.75,0.375c3.25,0 5.75,-0.375 5.75,-0.375l-0.125,0c0.625,0
               1.125,-0.375 1.312,-0.938l0,-0.062c0,-0.063 0,-0.125
               0.063,-0.188c0.062,-0.625 0.25,-1.937 0.25,-3.437c0,-1.5 -0.125,-2.813
               -0.25,-3.438Zm-4.634,3.927l-3.201,2.315c-0.068,0.068 -0.137,0.068
               -0.205,0.068c-0.068,0 -0.136,0 -0.204,-0.068c-0.136,-0.068 -0.204,-0.204
               -0.204,-0.34l0,-4.631c0,-0.136 0.068,-0.273 0.204,-0.341c0.136,-0.068
               0.272,-0.068 0.409,0l3.201,2.316c0.068,0.068 0.136,0.204
               0.136,0.34c0.068,0.136 0,0.273 -0.136,0.341Z"
                        style={{ fill: "rgb(255, 255, 255)" }}
                      />
                    </g>
                  </svg>
                </a>
                <a href="/#" className="w-6 mx-1">
                  <svg
                    className="text-gray-500 cursor-pointer fill-current hover:text-gray-400"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      id="Shape"
                      d="M7.3,0.9c1.5,-0.6 3.1,-0.9 4.7,-0.9c1.6,0 3.2,0.3 4.7,0.9c1.5,0.6 2.8,1.5
            3.8,2.6c1,1.1 1.9,2.3 2.6,3.8c0.7,1.5 0.9,3 0.9,4.7c0,1.7 -0.3,3.2
            -0.9,4.7c-0.6,1.5 -1.5,2.8 -2.6,3.8c-1.1,1 -2.3,1.9 -3.8,2.6c-1.5,0.7
            -3.1,0.9 -4.7,0.9c-1.6,0 -3.2,-0.3 -4.7,-0.9c-1.5,-0.6 -2.8,-1.5
            -3.8,-2.6c-1,-1.1 -1.9,-2.3 -2.6,-3.8c-0.7,-1.5 -0.9,-3.1 -0.9,-4.7c0,-1.6
            0.3,-3.2 0.9,-4.7c0.6,-1.5 1.5,-2.8 2.6,-3.8c1.1,-1 2.3,-1.9
            3.8,-2.6Zm-0.3,7.1c0.6,0 1.1,-0.2 1.5,-0.5c0.4,-0.3 0.5,-0.8 0.5,-1.3c0,-0.5
            -0.2,-0.9 -0.6,-1.2c-0.4,-0.3 -0.8,-0.5 -1.4,-0.5c-0.6,0 -1.1,0.2
            -1.4,0.5c-0.3,0.3 -0.6,0.7 -0.6,1.2c0,0.5 0.2,0.9 0.5,1.3c0.3,0.4 0.9,0.5
            1.5,0.5Zm1.5,10l0,-8.5l-3,0l0,8.5l3,0Zm11,0l0,-4.5c0,-1.4 -0.3,-2.5
            -0.9,-3.3c-0.6,-0.8 -1.5,-1.2 -2.6,-1.2c-0.6,0 -1.1,0.2 -1.5,0.5c-0.4,0.3
            -0.8,0.8 -0.9,1.3l-0.1,-1.3l-3,0l0.1,2l0,6.5l3,0l0,-4.5c0,-0.6 0.1,-1.1
            0.4,-1.5c0.3,-0.4 0.6,-0.5 1.1,-0.5c0.5,0 0.9,0.2 1.1,0.5c0.2,0.3 0.4,0.8
            0.4,1.5l0,4.5l2.9,0Z"
                    />
                  </svg>
                </a>
                <a href="/#" className="w-6 mx-1">
                  <svg
                    className="text-gray-500 cursor-pointer fill-current hover:text-gray-400"
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlSpace="preserve"
                    style={{
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      strokeLinejoin: "round",
                      strokeMiterlimit: 2,
                    }}
                  >
                    <path
                      id="Combined-Shape"
                      d="M12,24c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12c-6.627,0
            -12,5.373 -12,12c0,6.627 5.373,12 12,12Zm6.591,-15.556l-0.722,0c-0.189,0
            -0.681,0.208 -0.681,0.385l0,6.422c0,0.178 0.492,0.323
            0.681,0.323l0.722,0l0,1.426l-4.675,0l0,-1.426l0.935,0l0,-6.655l-0.163,0l-2.251,8.081l-1.742,0l-2.222,-8.081l-0.168,0l0,6.655l0.935,0l0,1.426l-3.74,0l0,-1.426l0.519,0c0.203,0
            0.416,-0.145 0.416,-0.323l0,-6.422c0,-0.177 -0.213,-0.385
            -0.416,-0.385l-0.519,0l0,-1.426l4.847,0l1.583,5.704l0.042,0l1.598,-5.704l5.021,0l0,1.426Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
