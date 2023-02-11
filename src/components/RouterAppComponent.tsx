import React from 'react'
import { IoArrowForward, IoFilter, IoSearch } from 'react-icons/io5'
import { RiNotificationBadgeFill } from 'react-icons/ri'
import { Route, Routes, useLocation } from 'react-router-dom'
import Page404 from '../pages/404Page'
import ContainerPrincipal from '../pages/ContainerPrincipal'
import FAQ from '../pages/FAQ'
import Orders from '../pages/Orders'
import PageSettings from '../pages/PageSettings'
import { AnimatePresence } from 'framer-motion';
import DetailNft from '../pages/DetailNft'
import HomeView from '../pages/HomeView'
import Footer from './Footer'
import ManageNFTs from '../pages/ManageNFTs'
import CreateNFt from '../pages/CreateNFt'
import CollectionsPage from '../pages/CollectionsPage'
import AboutPage from '../pages/AboutPage'
import { useMediaQuery } from 'usehooks-ts'


const RouterAppComponent = ({ isOpen, isOpenUser, controlSearch }:
    { isOpen: boolean, isOpenUser: boolean, controlSearch: () => void }) => {

    const location = useLocation();
    return (
        <div className={((isOpen) && (isOpenUser)) ? "custom-w-3 ishowUs isho mt-1" :
            (isOpen) ? "custom-w-3 isho mt-1" :
                (isOpenUser) ? "custom-w-3 ishowUs mt-1" :
                    "custom-w-3 mt-1"}
            id='principalContent'>


            <div className="flex row align-center mb-8 flex-wrap gap-[1rem]">
                <div
                    onClick={controlSearch}
                    className="control-container cursor-text" id='cPar'>
                    <IoSearch
                        color="white"
                        size={18}
                    />
                    <div style={{ width: "30vw" }} className="text-white font-MontRegular text-sm">Rechercher</div>

                </div>

                <div className="flex row align-center gap-2">
                    <button className="customButtonFilterD">
                        <IoFilter
                            color="white"
                            size={15}
                        /> 2.486572ETH</button>
                    <button className="customButtonFilterD p0">
                        <RiNotificationBadgeFill
                            color="white"
                            size={15}
                        /></button>
                </div>
            </div>


            <AnimatePresence>
                <Routes location={location} key={location.key}>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/nftMarketPlace" element={<ContainerPrincipal />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/faqs" element={<FAQ />} />
                    <Route path="*" element={<Page404 />} />
                    <Route path="/settings" element={<PageSettings />} />
                    <Route path="/detailOwnNFT" element={<DetailNft />} />
                    <Route path="/detailNFT" element={<DetailNft />} />
                    <Route path="/manageNFTs" element={<ManageNFTs />} />
                    <Route path="/createNFt" element={<CreateNFt />} />
                    <Route path="/collectionsPage" element={<CollectionsPage />} />
                    <Route path="/aboutPage" element={<AboutPage />} />
                    {/* <Route path="/virtualVisit" element={<VirtualVisit />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/email_check" element={<CheckMail />} />
                      <Route path="/registerpart" element={<RegisterPart />} />
                      <Route path="/registerpro" element={<RegisterPro />} />
                      <Route path="/reset-password" element={<ReInitialisePass />} />
                      <Route path="/reset-password/reset" element={<PasswordReset />} />
                      <Route path="/adsCat2" element={<AdsCat2 />} />
                      <Route path="/new_add" element={<NewAdd />} />
                      <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
            </AnimatePresence>

            <Footer />
        </div>
    )
}

export default RouterAppComponent