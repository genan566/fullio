import React from 'react';
import './styles/App.css';
import SideNavs from './components/SideNavs';
import ProfilBox from './components/ProfilBox';
import { RiLockPasswordLine, RiNotificationBadgeFill } from 'react-icons/ri';
import { IoClose, IoFilter, IoMenu, IoPerson, IoSearch } from 'react-icons/io5';

import LOGOPNG from "./imgs/nft.png";
import { Route, Routes, useLocation } from 'react-router-dom';
import Page404 from './pages/404Page';
import { AnimatePresence } from 'framer-motion';
import ContainerPrincipal from './pages/ContainerPrincipal';
import Orders from './pages/Orders';
import FAQ from './pages/FAQ';
import PageSettings from './pages/PageSettings';

import CustomIMG2 from "./imgs/pexels-pixabay.jpg"
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { GoogleLogin, GoogleOAuthProvider, googleLogout, } from '@react-oauth/google';

import jwt_decode from "jwt-decode"

import { useGoogleOneTapLogin } from 'react-google-one-tap-login'
import { RootUserContext, } from './contexts/RootUserContext';

import { UserTypesValues } from "./contexts/RootUserContext"
type toggleIsOpen = () => void;

function App() {
  const userContext = React.useContext(RootUserContext)
  useGoogleOneTapLogin({
    onSuccess: (response: any) => {
      if (response) {

        // if (!userContext?.user) {
        let { email, email_verified,
          family_name, given_name, name, picture }: UserTypesValues = response

        let dataStructured: UserTypesValues = {
          email: email,
          email_verified: email_verified,
          family_name: family_name,
          given_name: given_name,
          name: name,
          picture: picture,
        }

        // console.log("dataStructured", dataStructured)
        // console.log(" userContext?.setUser", userContext?.setUser)

        userContext?.setUser(dataStructured)
        localStorage.setItem('dataUser', JSON.stringify(dataStructured));
        // }
      }

    },
    onError: (err: any) => console.log(err),
    googleAccountConfigs: {
      client_id: "741957755353-qvj39g2qbhg6mtqgsshlqo40vh585u83.apps.googleusercontent.com"
    }

  })


  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isOpenUser, setIsOpenUser] = React.useState<boolean>(false)
  const [isOpenResearch, setIsOpenResearch] = React.useState<boolean>(false)
  const toggleIsOpenUser: toggleIsOpen = () => setIsOpenUser(!isOpenUser)
  const toggleIsOpen: toggleIsOpen = () => setIsOpen(!isOpen)
  const [isShownModalsSignIn, setIsShownModalsSignIn] = React.useState<boolean>(false)
  // const [user, setUser] = React.useState<{} | any>({})

  const responseGoogle = (response: any): void => {
    console.log("response", response)
    if (response.credential) {

      let { email, email_verified,
        family_name, given_name, name, picture }: UserTypesValues = jwt_decode(response.credential)

      let dataStructured: UserTypesValues = {
        email: email,
        email_verified: email_verified,
        family_name: family_name,
        given_name: given_name,
        name: name,
        picture: picture,
      }

      // console.log("dataStructured", dataStructured)
      // console.log(" userContext?.setUser", userContext?.setUser)

      userContext?.setUser(dataStructured)
      localStorage.setItem('dataUser', JSON.stringify(dataStructured));
    }

    setIsShownModalsSignIn(false)
    // setUser(response.Qt)
  }

  React.useEffect(() => {
    let items = localStorage.getItem('dataUser') || "";
    if (items) {
      let decoder = JSON.parse(items);
      console.log("allo", decoder)
      userContext?.setUser(decoder)
    }

    // localStorage.setItem('dataKey', JSON.stringify(dataStructured));
  }, [])

  React.useEffect(() => {
    console.log("user", userContext?.user)
  }, [userContext])

  const userID = "741957755353-qvj39g2qbhg6mtqgsshlqo40vh585u83.apps.googleusercontent.com"

  // React.useEffect(() => {

  // }, [])


  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId={userID}>

      <div className="App">
        <div className='holdUp'>
          {
            isShownModalsSignIn && (
              <>
                <div className="cModals">

                  <div className="cModals-container">
                    <button
                      onClick={() => setIsShownModalsSignIn(false)} className="cModals-container-close">
                      <IoClose
                        color="white"
                        size={18}
                      />
                    </button>
                    <img src={LOGOPNG} className="" alt="Imgs" />
                    <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-3">Sign Up</h2>
                    <h2 className="text-sm font-Regular text-slate-200 mt-1">Please login to your account</h2>

                    <div className="mt-5" style={{ textAlign: "center", width: "90%" }}>
                      <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your mail</p>

                      <div className="control-container-S mt-3 mb-2" id='cPar'>
                        <IoPerson
                          color="white"
                          size={18}
                        />
                        <input
                          placeholder='Your mail'
                          type="text"
                          className="control-input-S" />
                      </div>
                    </div>

                    <div className="mt-3" style={{ textAlign: "center", width: "90%", }}>
                      <p className="text-sxl font-MontBold text-white underline underline-offset-1">Enter your password</p>

                      <div className="control-container-S mt-3 mb-2" id='cPar'>
                        <RiLockPasswordLine
                          color="white"
                          size={18}
                        />
                        <input

                          placeholder='Your password'
                          type="password"
                          className="control-input-S" />
                      </div>
                    </div>

                    <div style={{ width: "90%", marginBottom: 5 }}>
                      <button className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none w-full
                            focus:ring-2 text-sm
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl mt-5">
                        Submit
                      </button></div>

                    <h2 className="text-sm font-Regular text-slate-200 mt-3">You have not an account yet /
                      <button
                        // onClick={() => googleLogout()}
                        // onClick={() => console.log("ioReactUserLogin", ioReactUserLogin)}
                        style={{ textDecoration: "underline" }}>Sign Up</button></h2>

                    {/* <div className="signDiv"></div> */}

                    <div className="mt-4">
                      <GoogleLogin
                        // className='rounded-2xl mt-5 w-full text-center'
                        // clientId={userID}
                        // buttonText="Se connecter avec google"
                        onSuccess={responseGoogle}
                        onError={() => {
                          setIsShownModalsSignIn(false)
                          console.log("dfigvbfg")
                        }}
                      // cookiePolicy={'single_host_origin'}
                      // isSignedIn={true}
                      />
                    </div>
                    {/* <GoogleLogout
                    clientId="741957755353-qvj39g2qbhg6mtqgsshlqo40vh585u83.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => console.log("va")}
                  /> */}
                  </div>
                </div>
              </>

            )
          }

          {
            isOpenResearch && (
              <>
                <div className="cModals">

                  <div className="cModals-container p0">
                    <button
                      onClick={() => setIsOpenResearch(false)} className="cModals-container-close">
                      <IoClose
                        color="white"
                        size={18}
                      />
                    </button>
                    {/* <img src={LOGOPNG} className="" alt="Imgs" />
                    <h2 className="text-lg font-MontSemiBold text-white mt-5 mb-3">Sign Up</h2>
                    <h2 className="text-sm font-Regular text-slate-200 mt-1">Please login to your account</h2> */}

                    <div className="mt-5" style={{ width: "90%", marginTop: "1rem" }}>
                      <p className="text-sxl font-MontBold text-white">Enter your research</p>

                      <div className="control-container-S mt-3 mb-1" id='cPar'>
                        <IoSearch
                          color="white"
                          size={18}
                        />
                        <input
                          placeholder='Your search'
                          type="text"
                          className="control-input-S" />
                      </div>
                    </div>


                    <p className="text-sxl font-MontRegular mt-5 text-slate-200 mx-4">Aucun résultat de recherche pour l'instant veuillez bien entrer un truc</p>
                    {/* <div style={{ width: "90%",}}>
                      <button className="bg-violet-500
                            hover:bg-violet-600
                            active:bg-violet-700 
                            focus:outline-none w-full
                            focus:ring-2 text-sm
                            focus:ring-violet-300
                                py-2 text-white px-5
                                rounded-2xl mt-2">
                        Valider
                      </button>
                    </div> */}
                  </div>
                </div>
              </>

            )
          }

          <div className="flex gap-7 mParent">

            <SideNavs
              handleLog={() => setIsShownModalsSignIn(!isShownModalsSignIn)}
              isOpen={isOpen}
              toggleIsOpen={toggleIsOpen} />


            <div className={((isOpen) && (isOpenUser)) ? "custom-w-3 ishowUs isho mt-1" :
              (isOpen) ? "custom-w-3 isho mt-1" :
                (isOpenUser) ? "custom-w-3 ishowUs mt-1" :
                  "custom-w-3 mt-1"}
              id='principalContent'>
              {/* <ContainerPrincipal
              isOpen={isOpen}
            /> */}


              <div className="flex row align-center mb-8">
                <div
                  onClick={() => setIsOpenResearch(true)}
                  className="control-container" id='cPar'>
                  <IoSearch
                    color="white"
                    size={18}
                  />
                  <div style={{ width: "30vw" }} className="text-white font-MontRegular text-sm">Rechercher</div>
                  {/* <input
                    placeholder='Search Artwork'
                    type="text"
                    className="control-input" /> */}
                </div>

                <div className="flex row align-center gap-2">
                  <button className="customButtonFilterD">
                    <IoFilter
                      color="white"
                      size={15}
                    /> 2486572ETH</button>
                  <button className="customButtonFilterD p0">
                    <RiNotificationBadgeFill
                      color="white"
                      size={15}
                    /></button>
                </div>
              </div>


              <AnimatePresence>
                <Routes location={location} key={location.key}>
                  <Route path="/" element={<ContainerPrincipal />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/faqs" element={<FAQ />} />
                  <Route path="*" element={<Page404 />} />
                  <Route path="/settings" element={<PageSettings />} />
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

              <div className="flex justify-center">
                <p className="text-sm text-white font-MontSemiBold mt-7">Fullio@ 2022, All right reserved</p>
              </div>
            </div>

            {
              !isOpenUser && <button
                onClick={toggleIsOpenUser}
                className="navs-close-D mt-1 mr-1">
                {/* {
                    isOpen ? <IoClose
                        color="white"
                        size={18}
                    /> :
                } */}

                {
                  userContext?.user ? <>

                    <img
                      className="rounded-full object-cover"
                      src={userContext?.user.picture}
                      alt="user Profile" />
                  </> : <>
                    <img
                      className="rounded-full object-cover"
                      src={CustomIMG2}
                      alt="user Profile" />
                  </>
                }
              </button>
            }

            {
              isOpenUser && <ProfilBox
                handleLog={() => setIsShownModalsSignIn(!isShownModalsSignIn)}
                handlShow={() => setIsOpenUser(!isOpenUser)}
              />
            }

          </div >
        </div >
      </div >

    </GoogleOAuthProvider>
  );
}

export default App;
