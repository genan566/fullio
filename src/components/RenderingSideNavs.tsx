import React from 'react'


import { IoClose, IoSettings, IoLogOut, IoLogIn, IoMenu, IoHome, IoAtCircleOutline } from "react-icons/io5";

import { MdOutlineDashboardCustomize } from "react-icons/md";

import NFT from "../imgs/nft.png";

import { FaQuinscape } from "react-icons/fa";

import { Link } from 'react-router-dom';
import { RootUserContext } from '../contexts';
import { GiVirtualMarker } from 'react-icons/gi';



const RenderingSideNavs = ({ toggleIsOpen, isOpen, isActive, setIsActive, handleLogOut, handleLog }:
    { isOpen: boolean, toggleIsOpen: () => void, handleLog: () => void, handleLogOut: () => void, isActive: string, setIsActive: React.Dispatch<React.SetStateAction<string>> }) => {
    const userContext = React.useContext(RootUserContext)
    return (
        <>
            <button
                onClick={toggleIsOpen} className="navs-close">
                {
                    isOpen ? <IoClose
                        color="white"
                        size={18}
                    /> : <IoMenu
                        color="white"
                        size={18}
                    />
                }
            </button>

            <div className="vertical-A gap-5 mt-12">

                <div
                    className="logoS">
                    <img src={NFT} alt="logo" />
                </div>
                {
                    isOpen && <>

                        <p className="text-md font-MontBold text-white">FULLIO</p>
                    </>
                }

                <Link
                    to={"/"}
                    onClick={() => setIsActive("/")}
                    className={isActive === "/" ? "customButtonFilterD-S p0 mt-4 active" : "customButtonFilterD-S p0 mt-4"}>
                    <IoHome
                        color={isActive === "/" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Acceuil</span>
                </Link>

                <Link
                    to={"/nftMarketPlace"}
                    onClick={() => setIsActive("/nftMarketPlace")} className={((isActive === "/nftMarketPlace") || (isActive === "/detailNFT")) ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <GiVirtualMarker
                        color={((isActive === "/nftMarketPlace") || (isActive === "/detailNFT")) ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Market Place</span>
                </Link>

                {
                    userContext.user?.is_staff && <Link
                        to={"/manageNFTs"}
                        onClick={() => setIsActive("/manageNFTs")}
                        className={((isActive === "/manageNFTs") || (isActive === "/createNFt") || (isActive === "/detailOwnNFT")) ?
                            "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                        <MdOutlineDashboardCustomize
                            color={((isActive === "/manageNFTs") || (isActive === "/createNFt") || (isActive === "/detailOwnNFT")) ? "black" : "white"}
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Manage NFTs</span>
                    </Link>
                }

                {/* <Link
                                to={"/orders"}
                                onClick={() => setIsActive("/orders")} className={isActive === "/orders" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                                <IoBusiness
                                    color={isActive === "/orders" ? "black" : "white"}
                                    size={18}
                                />
                                <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Mes Ordres</span>
                            </Link> */}

                {/* <Link
                                to={"/strategies"}
                                onClick={() => setIsActive("/strategies")} className={isActive === "/strategies" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                                <IoInfinite
                                    color={isActive === "/strategies" ? "black" : "white"}
                                    size={18}
                                />
                                <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Mes Stratégies</span>
                            </Link> */}

                <Link
                    to={"/faqs"}
                    onClick={() => setIsActive("/faqs")} className={isActive === "/faqs" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <FaQuinscape
                        color={isActive === "/faqs" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>FAQS</span>
                </Link>





                <Link
                    to={"/settings"}
                    onClick={() => setIsActive("Paramètres")} className={isActive === "/settings" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoSettings
                        color={isActive === "/settings" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Paramètres</span>
                </Link>




                {/* <Link
                                to={"/collectionsPage"}
                                onClick={() => setIsActive("/collectionsPage")} className={isActive === "/collectionsPage" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                                <BsCollection
                                    color={isActive === "/collectionsPage" ? "black" : "white"}
                                    size={18}
                                />
                                <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Collections</span>
                            </Link> */}

                <Link
                    to={"/aboutPage"}
                    onClick={() => setIsActive("/aboutPage")} className={isActive === "/aboutPage" ? "customButtonFilterD-S p0 active" : "customButtonFilterD-S p0"}>
                    <IoAtCircleOutline
                        color={isActive === "/aboutPage" ? "black" : "white"}
                        size={18}
                    />
                    <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>About Us</span>
                </Link>

            </div>

            {
                userContext?.user.id ?
                    <button
                        onClick={handleLogOut}
                        className="customButtonFilterD-S d p0 mt-5">
                        <IoLogOut
                            color="white"
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.75rem' }}>Log Out</span>
                    </button >
                    : <button
                        onClick={handleLog}
                        className="customButtonFilterD-S danger p0 mt-5">
                        <IoLogIn
                            color="white"
                            size={18}
                        />
                        <span id={isOpen ? "onHovP act" : 'onHovP'} className="text-sm font-MontSemiBold" style={{ fontSize: '.8rem' }}>Login</span>
                    </button >
            }
        </>
    )
}

export default RenderingSideNavs