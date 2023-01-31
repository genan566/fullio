import React from 'react'
import { IoArrowDown, IoArrowForward, IoMail, IoPerson, IoSearch, IoSend } from 'react-icons/io5'

import ISOTOP from "../imgs/vadim-bogulov-lG4A4GmcYYg-unsplash.jpg";
const Footer = () => {
    return (
        <>
            <div className="mt-[10rem] px-[1rem]">
                <div className="animated_gradient_bg animFalse w-full rounded-lg shadow-lg p-2 py-[4rem] mt-[5rem] relative">
                    <div className="p-[.25rem] rounded-full animated_gradient_bg text w-fit translate-x-[-50%]
                                overflow-hidden absolute top-[-2rem] left-[50%] shadow-lg">

                        <img
                            className="h-20 w-20 rounded-full object-cover shadow-lg"
                            src={ISOTOP}
                            alt="user Profile" />
                    </div>
                    <div className="px-[4rem] flex flex-row justify-between gap-[1rem] items-center flex-wrap">
                        <h2 className="text-white after:content-[''] after:w-[25%] after:h-[1px] after:shadow-md font-MontBold
                            after:absolute after:top-0 after:left-0 after:bg-white relative text-[1.8rem] leading-[2.5rem] py-4 ">
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
            <div className=" mt-[7rem] bg-slate-800 w-fit mx-auto p-[3rem] rounded-xl shadow-2xl">
                <div className="px-[1.5vw] max-w-[1100px] mx-auto flex flex-row justify-center gap-[1rem] items-center flex-wrap">
                    <h2 className="text-white after:content-[''] after:w-[15%] after:h-[1px] after:shadow-md font-MontSemiBold
                        after:absolute after:top-0 after:left-0 after:bg-white relative text-[1.9rem] leading-[2.5rem] py-4 w-[50%]">
                        Send us a mail
                    </h2>

                    <p className='text-white text-sm flex-grow w-[30%]'>Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Nobis error neque dicta <span className="text-white font-MontSemiBold">quam numquam fuga </span>
                        libero fugiat! Itaque.</p>
                </div>
                <div className="px-[1.5vw] max-w-[1100px] mx-auto">

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
                        hover:bg-transparent hover: border hover: border-violet-600 hover:text-white animate-pulse
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
                    <p className="text-white text-sm mt-[1rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellendus saepe quaerat alias voluptate quis vel ducimus nostrum eos magnam nulla, beatae molestiae
                        obcaecati provident. Deserunt, sequi. Nulla, odio ea.</p>
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

                    <button
                        // onClick={handleLog}
                        className="bg-transparent flex row items-center justify-center gap-1 w-fit border border-white
                        hover:bg-white hover:text-black mt-4
                        
                        focus:outline-none
                        text-sm font-MontSemiBold
                        focus:ring-2
                        focus:ring-gray-500
                            py-1 text-white px-3
                            rounded-lg"> <p>Contact Nuw</p>
                        <IoArrowForward
                            // color="white"
                            size={17}
                        />
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <p className="text-sm text-white font-MontSemiBold mt-7">Fullio@ 2022, All right reserved</p>
            </div>
        </>
    )
}

export default Footer