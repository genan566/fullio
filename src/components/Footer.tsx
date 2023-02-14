import React from 'react'
import { IoArrowDown, IoArrowForward, IoMail, IoPerson, IoSearch, IoSend } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom';
import { RootUserContext } from '../contexts';

import ISOTOP from "../imgs/vadim-bogulov-lG4A4GmcYYg-unsplash.jpg";
const Footer = () => {

    const location = useLocation();
    const userContext = React.useContext(RootUserContext)
    return (
        <>
            <div className="mt-[10rem]">
                <div className="animated_gradient_bg animFalse max-[800px]:w-full rounded-lg shadow-lg p-2 py-[4rem] mt-[5rem] relative">
                    <div className="p-[.25rem] rounded-full animated_gradient_bg text w-fit translate-x-[-50%]
                                overflow-hidden absolute top-[-2rem] left-[50%] shadow-lg">

                        <img
                            className="h-20 w-20 rounded-full object-cover shadow-lg"
                            src={ISOTOP}
                            alt="user Profile" />
                    </div>
                    <div className="px-[4rem] flex flex-row max-[600px]:justify-center justify-between gap-[1rem] items-center flex-wrap">
                        <h2 className="text-white after:content-[''] after:w-[25%] after:h-[1px] after:shadow-md font-MontBold max-[600px]:w-full max-[600px]:text-center
                            after:absolute after:top-0 after:left-0 max-[600px]:after:left-[50%] max-[600px]:my-[1.5rem] max-[600px]:after:translate-x-[-50%] after:bg-white relative text-[1.8rem] leading-[2.5rem] py-4 ">
                            Discover a unique <span className="block">collection artistic works</span>
                        </h2>

                        <div className="">
                            <button
                                // onClick={handleLog}
                                className="bg-transparent flex items-center justify-center gap-1 w-[200px] border border-white
                                    hover:bg-white hover:text-black                                         
                                    focus:outline-none
                                    text-sm font-MontSemiBold
                                    focus:ring-2
                                    focus:ring-gray-500
                                        py-1 text-white px-3
                                        rounded-lg">
                                <p>Check More</p>
                                <IoArrowForward
                                    className='ml-1'
                                    // color="white"
                                    size={17}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id='mailing'
                className="mt-[7rem] bg-slate-800 max-[1000px]:w-[95%] w-fit mx-auto max-[500px]:p-[1.8rem] min-[1000px]:p-[3rem] rounded-xl shadow-2xl">
                <div className="min-[1000px]:px-[1.5vw] max-w-[900px] mx-auto flex flex-row justify-center gap-[1rem] items-center max-[800px]:flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                        after:absolute after:top-0 after:left-0 after:bg-indigo-500 relative text-[1.9rem] leading-[2.5rem] py-4 w-[50%] max-[800px]:w-full">
                        Send us a mail
                    </h2>

                    <p className='text-white text-sm w-[50%] max-[800px]:w-full'>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Nobis error neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque.</p>
                </div>
                <div className="min-[1000px]:px-[1.5vw] max-w-[900px] mx-auto">

                    <div className=" mt-[1rem] flex justify-center items-center gap-[1rem] max-[600px]:flex-wrap">
                        <div className='w-full'>
                            <p className="text-xs font-MontBold text-white mb-4">Enter your name</p>

                            <div className="control-container-S mt-3 mb-1" id='cPar'>
                                <IoPerson
                                    color="white"
                                    size={18}
                                />
                                <input
                                    placeholder='Your name'
                                    type="text"
                                    className="control-input-S" />
                            </div>
                        </div>

                        <div className='w-full'>
                            <p className="text-xs font-MontBold text-white mb-4">Enter your firstname</p>

                            <div className="control-container-S mt-3 mb-1" id='cPar'>
                                <IoPerson
                                    color="white"
                                    size={18}
                                />
                                <input
                                    placeholder='Your firstname'
                                    type="text"
                                    className="control-input-S" />
                            </div>
                        </div>
                    </div>



                    <div className='w-full mt-[1rem]'>
                        <p className="text-xs font-MontBold text-white mb-4">Enter your mail</p>

                        <div className="control-container-S mt-3 mb-1" id='cPar'>
                            <IoMail
                                color="white"
                                size={18}
                            />
                            <input
                                placeholder='Your mail'
                                type="email"
                                className="control-input-S" />
                        </div>
                    </div>

                    <div className='w-full mt-[1rem]'>
                        <p className="text-xs font-MontBold text-white mb-4">Enter your message</p>

                        <div className="control-container-S sB mt-3 mb-1" id='cPar'>
                            <textarea
                                placeholder='Your message'
                                rows={8}
                                className="control-input-S" />
                        </div>
                    </div>
                </div>

                <button
                    // onClick={handleLog}
                    className="bg-violet-600 flex row items-center justify-center gap-1 w-fit  mx-auto mt-[2rem]
                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-[2rem]
                            rounded-lg">
                    <p className='mr-[.5rem]'>Send message</p>
                    <IoSend
                        // color="white"
                        size={17}
                    />
                </button>
            </div>
            <div className="flex max-w-[1300px] mx-auto justify-between gap-[1rem] px-[1rem] mt-[5rem] max-[600px]:flex-wrap">
                <div className="gap-[1rem]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Fullio</p>
                    <p className="text-white text-sm mt-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus saepe quaerat vel ducimus nostrum eos magnam nulla, beatae molestiae
                        obcaecati <span className="font-MontSemiBold">alias voluptate quis</span> provident. Deserunt, sequi. Nulla, odio ea.</p>
                </div>

                <div className="gap-[1rem]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Navigation</p>
                    <div className="flex flex-wrap gap-4 min-w-[250px]">
                        <Link to={"/"}>
                            <p className={location.pathname === "/" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Acceuil</p>
                        </Link>

                        <Link to={"/nftMarketPlace"}>
                            <p className={location.pathname === "/nftMarketPlace" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>MarketPlace</p>
                        </Link>

                        {
                            userContext.user?.is_staff && <Link to={"/manageNFTs"}>
                                <p className={location.pathname === "/manageNFTs" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Manage NFTs</p>
                            </Link>
                        }


                        <Link to={"/faqs"}>
                            <p className={location.pathname === "/faqs" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>FAQs</p>
                        </Link>

                        <Link to={"/settings"}>
                            <p className={location.pathname === "/settings" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>Paramètres</p>
                        </Link>

                        <Link to={"/aboutPage"}>
                            <p className={location.pathname === "/aboutPage" ? "text-indigo-500 font-MontSemiBold text-sm " : "text-white font-MontSemiRegular text-sm "}>About Us</p>
                        </Link>
                    </div>
                </div>

                <div className="gap-[1rem]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Categories</p>
                    <p className="text-white text-sm mt-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus saepe quaerat alias voluptate quis vel ducimus nostrum eos magnam nulla, beatae molestiae
                        obcaecati provident. Deserunt, sequi. Nulla, odio ea.</p>
                </div>

                <div className="gap-[1rem]">
                    <p className="text-white font-MontSemiBold text-sm mb-[2rem]">Send Message</p>
                    <p className="text-white text-sm mt-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus saepe quaerat alias voluptate quis vel ducimus nostrum eos magnam nulla, beatae molestiae
                        obcaecati provident. Deserunt, sequi. Nulla, odio ea.</p>

                    <a href="#mailing"

                        className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black mt-4
                        
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-3
                            rounded-lg"> <p>Contact Us</p>
                        <IoArrowForward
                            // color="white"
                            size={17}
                        />
                    </a>
                </div>
            </div>
            <div className="flex justify-center">
                <p className="text-sm text-white font-MontSemiBold mt-7">Fullio@ 2022, All right reserved</p>
            </div>
        </>
    )
}

export default Footer