import React from 'react'

import NFT10 from "../imgs/shubham-dhage-PACWvLRNzj8-unsplash.jpg";
import NFT11 from "../imgs/rebecca-hansen-uHPiL0ieVl4-unsplash.jpg";
import { RiShoppingBasket2Line } from 'react-icons/ri';
const CollectionsPage = () => {
    return (
        <div>
            <div className="mt-[5rem]">
                <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                    <div className='point'></div> The Best Choice</span>
                <div className="mt-[1rem] mb-[1rem]">
                    <h2 className="text-[4rem] font-MontBold">Collections</h2>
                </div>
                <p className="font-SemiBold text-slate-400 text-[.8rem]">Lorem ipsum, dolor sit amet consectetur </p>
                <h2 className="font-MontSemiBold text-[1.5rem]">Lorem ipsum, dolor </h2>

                <div className="flex justify-between items-center flex-wrap gap-[.7rem] mt-[2rem]">
                    <p className='text-white text-sm max-w-[700px]'>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Nobis error neque dolor sit amet consectetur dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque.</p>
                    <p className="uppercase font-MontBold text-white border-b border-white border-1">Lorem Ipsum DOlor</p>
                </div>

                <div className="mt-[3.5rem] flex items-center gap-[3rem] max-[500px]:gap-[4rem] max-[500px]:flex-wrap px-[1rem]">
                    <div className="bg-white w-full h-[250px] rounded-xl shadow-lg gap-4 flex">
                        <img
                            className="h-full w-[250px] rounded-sm transition-all hover:scale-[1.2] hover:rounded-lg object-cover shadow-2xl mr-[2rem]"
                            src={NFT10}
                            alt="user Profile" />
                        <div className="flex flex-col justify-center px-2">
                            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                                <div className='point'></div> The Best Choice</span>

                            <h2 className="text-[1.5rem] font-MontBold mt-[.5rem] text-black">Collections</h2>
                            <p className='text-black text-sm '>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dolor sit amet consectetur dicta <span className="text-black font-MontSemiBold">quam numquam fuga </span>
                                libero fugiat! Itaque.</p>

                            <button
                                // onClick={handleLog}
                                className="bg-indigo-600 flex row items-center justify-center gap-1 w-fit 
                            hover:bg-transparent hover:text-indigo-600 hover:border border-violet-600
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500 mt-5
                                py-1 text-white px-3
                                rounded-lg">
                                <RiShoppingBasket2Line
                                    // color="white"
                                    size={17}
                                /> <p>Create One</p>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white w-full h-[250px] rounded-xl shadow-lg gap-4 flex">
                        <img
                            className="h-full w-[250px] rounded-sm transition-all hover:scale-[1.2] hover:rounded-lg object-cover shadow-2xl mr-[2rem]"
                            src={NFT10}
                            alt="user Profile" />
                        <div className="flex flex-col justify-center px-2">
                            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                                <div className='point'></div> The Best Choice</span>

                            <h2 className="text-[1.5rem] font-MontBold mt-[.5rem] text-black">Collections</h2>
                            <p className='text-black text-sm '>Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nobis error neque dolor sit amet consectetur dicta <span className="text-black font-MontSemiBold">quam numquam fuga </span>
                                libero fugiat! Itaque.</p>

                            <button
                                // onClick={handleLog}
                                className="bg-indigo-600 flex row items-center justify-center gap-1 w-fit 
                            hover:bg-transparent hover:text-indigo-600 hover:border border-violet-600
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500 mt-5
                                py-1 text-white px-3
                                rounded-lg">
                                <RiShoppingBasket2Line
                                    // color="white"
                                    size={17}
                                /> <p>Create One</p>
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default CollectionsPage