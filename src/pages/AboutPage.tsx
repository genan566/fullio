import React from 'react'
import { RiShoppingBasket2Line } from 'react-icons/ri';

import NFT10 from "../imgs/shubham-dhage-PACWvLRNzj8-unsplash.jpg";
import NFT11 from "../imgs/rebecca-hansen-uHPiL0ieVl4-unsplash.jpg";
import CardNFT from '../components/CardNFT';

import NFT8 from "../imgs/5.png";
import NFT9 from "../imgs/6.png";
import NFT12 from "../imgs/istockphoto-1367699775-612x612.jpg";


const AboutPage = () => {
    return (
        <div className='px-[1rem] max-[500px]:px-2'>
            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                <div className='point'></div> The Best Choice</span>
            <div className="flex justify-between items-center mt-[1.8rem]">
                <h2 className="text-[3rem] font-MontBold w-full capitalize">About us</h2>
                <div className="w-full">
                    <h2 className="font-MontBold mb-[.5rem]">Extra Biling data on search <span className="text-indigo-300">nfts products manager</span> info</h2>
                    <h4 className="text-xs text-slate-400 font-MontSemiBold w-full">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Placeat modi deleniti dolor distinctio esse! Nisi explicabo, tempore magnam eos provident deleniti
                        nesciunt, minima officia reiciendis natus ut ipsam reprehenderit distinctio!</h4>
                </div>
            </div>

            <figure className="w-full bg-white rounded-md p-4 mt-[3rem] relative h-[300px] overflow-hidden ">
                <img
                    className="h-full w-full absolute inset-0 z-[1] object-cover"
                    src={NFT11}
                    alt="user Profile" />
            </figure>

            <div className="px-[4.5rem]">
                <div className="w-full mt-[5rem] mx-auto flex flex-row justify-center gap-[1rem] items-center flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontBold
                            after:absolute after:top-0 after:left-0 after:bg-indigo-500 relative text-[1.6rem] leading-[2rem] py-4 w-[50%]">
                        Your business is significant <span className="block">numbers</span>
                    </h2>

                    <p className='text-white text-sm flex-grow w-[30%]'>Lorem ipsum dolor sit amet consectetur neque dicta  amet consectetur neque dicta  amet consectetur neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque.</p>
                </div>

                <div className="flex justify-center max-[500px]:flex-wrap items-start mt-[1.5rem] gap-[1rem]">
                    <div className="bg-zinc-800 rounded-md border border-indigo-600 transition-all hover:border-transparent shadow-2xl p-5 w-full max-w-[400px]">
                        <h2 className="font-MontBold text-indigo-300 text-[5.5rem]">20k+</h2>

                        <h4 className="text-[1.1rem] text-white font-MontBold w-full mt-[.2rem] leading-[1.5rem]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>

                        <h4 className="text-[.7rem] text-zinc-300 font-Regular w-full mt-[.5rem] ">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Placeat modi deleniti dolor distinctio esse! Nisi explicabo, <span className="text-zinc-200 font-MontBold">tempore magnam eos provident deleniti </span>
                            nesciunt, minima officia reiciendis natus ut ipsam reprehenderit distinctio! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente earum, officia sunt, voluptas officiis alias at laboriosam rem esse minima repellat vitae ea reprehenderit labore tenetur unde illo asperiores fuga.</h4>
                    </div>
                    <div className="bg-zinc-800 rounded-md border border-indigo-600 transition-all hover:border-transparent  shadow-2xl p-5 w-full max-w-[400px]">
                        <img
                            className="h-[100px] w-[100px] rounded-full object-cover shadow-lg"
                            src={NFT11}
                            alt="user Profile" />

                        <h4 className="text-[1.1rem] text-white font-MontBold w-full mt-[1rem] leading-[1.5rem]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>

                        <h4 className="text-[.7rem] text-zinc-300 font-Regular w-full mt-[1rem]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Placeat modi deleniti dolor distinctio esse! Nisi explicabo, <span className="text-zinc-200 font-MontBold">tempore magnam eos provident deleniti </span>
                            nesciunt, minima officia reiciendis natus ut ipsam reprehenderit distinctio!</h4>


                        <div className="mt-5">
                            <button
                                // onClick={handleLog}
                                className="bg-indigo-600 flex items-center justify-center gap-1 w-fit
                            hover:bg-transparent hover:text-indigo-600 hover:border border-violet-600
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500
                                py-1 text-white px-3
                                rounded-lg"><p>Follow Now</p>
                                <RiShoppingBasket2Line
                                    // color="white"
                                    size={17}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="bg-zinc-800 border border-indigo-600 transition-all hover:border-transparent rounded-md shadow-2xl p-5 w-full max-w-[400px]">
                        <h2 className="font-MontBold text-indigo-300 text-[5.5rem]">40k+</h2>

                        <h4 className="text-[1.1rem] text-white font-MontBold w-full mt-[.2rem] leading-[1.5rem]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>

                        <h4 className="text-[.7rem] text-zinc-300 font-Regular w-full mt-[.5rem]">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Placeat modi deleniti dolor distinctio esse! Nisi explicabo, <span className="text-zinc-200 font-MontBold">tempore magnam eos provident deleniti </span>
                            nesciunt, minima officia reiciendis natus ut ipsam reprehenderit distinctio!</h4>


                        <div className="mt-5">
                            <button
                                // onClick={handleLog}
                                className="bg-indigo-600 flex items-center justify-center gap-1 w-fit
                            hover:bg-transparent hover:text-indigo-600 hover:border border-violet-600
                            focus:outline-none
                            text-sm font-MontSemiBold
                            focus:ring-2
                            focus:ring-gray-500
                                py-1 text-white px-3
                                rounded-lg"><p>Follow Now</p>
                                <RiShoppingBasket2Line
                                    // color="white"
                                    size={17}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-xl font-MontSemiBold text-center mt-[10rem]">Yours Collections Products For the moment
                    <span className="rounded-lg border border-white text-[.8rem] py-1 px-4 ml-3 shadow-md">20</span></p>
                <p className="text-sm mt-[15px] font-MontSemiBold text-center text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                <div className="mt-[50px] flex gap-[25px] items-center w-full flex-wrap justify-center">
                    <CardNFT image={NFT11} />
                    <CardNFT image={NFT10} />
                    <CardNFT image={NFT8} />
                    <CardNFT image={NFT9} />
                    <CardNFT image={NFT12} />
                </div>

                <div className="w-full mt-[5rem] mx-auto">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontBold text-center mx-auto
                            after:absolute after:top-0 after:left-[50%] after:translate-x-[-50%] after:bg-indigo-500 relative text-[2rem] leading-[2.5rem] py-4 w-[50%]">
                        Latest published <span className="block">noob</span>
                    </h2>
                    <p className='text-white text-sm flex-grow w-1/3 block mx-auto mt-[.1rem] text-center'>Lorem ipsum dolor sit amet consectetur neque dicta  amet consectetur neque dicta  amet consectetur neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque.</p>
                </div>

                <div className="mt-[3.5rem] flex items-center gap-[3rem] max-[500px]:gap-[4rem] max-[500px]:flex-wrap px-[1rem]">
                    <div className="bg-white w-full h-[250px] overflow-hidden rounded-xl shadow-lg gap-4 flex">
                        <img
                            className="h-full w-[250px] rounded-sm transition-all hover:scale-[1.3] object-cover shadow-2xl mr-[2rem]"
                            src={NFT10}
                            alt="user Profile" />
                        <div className="flex flex-col justify-center px-2">
                            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                                <div className='point'></div> The Best Choice</span>

                            <h2 className="text-[1.5rem] font-MontBold mt-[.5rem] text-black">Collections</h2>
                            <p className='text-black text-sm '>Lorem ipsum dolor sit amet consectetur <span className="text-black font-MontSemiBold">quam numquam fuga </span>
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
                    <div className="bg-white w-full h-[250px] overflow-hidden rounded-xl shadow-lg gap-4 flex">
                        <img
                            className="h-full w-[250px] rounded-sm transition-all hover:scale-[1.3] object-cover shadow-2xl mr-[2rem]"
                            src={NFT10}
                            alt="user Profile" />
                        <div className="flex flex-col justify-center px-2">
                            <span className="rounded-lg bg-indigo-600 text-white text-[.8rem] py-1 px-4 shadow-md w-fit flex items-center gap-[.25rem]">
                                <div className='point'></div> The Best Choice</span>

                            <h2 className="text-[1.5rem] font-MontBold mt-[.5rem] text-black">Collections</h2>
                            <p className='text-black text-sm '>Lorem ipsum dolor sit amet consectetur <span className="text-black font-MontSemiBold">quam numquam fuga </span>
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
                <div className="mt-[5rem]">
                    <button
                        // onClick={handleLog}
                        className="bg-indigo-600 flex items-center justify-center gap-1 w-[250px] mx-auto
                    hover:bg-transparent hover:text-indigo-600 hover:border border-violet-600
                    focus:outline-none
                    text-sm font-MontSemiBold
                    focus:ring-2
                    focus:ring-gray-500
                        py-1 text-white px-3
                        rounded-lg"><p>Follow Now</p>
                        <RiShoppingBasket2Line
                            // color="white"
                            size={17}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AboutPage