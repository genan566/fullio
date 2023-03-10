import React from 'react';
import './styles/App.css';
import SideNavs from './components/SideNavs';
import { GoogleOAuthProvider, } from '@react-oauth/google';

import jwt_decode from "jwt-decode"
import { RootUserContext, RootUserTokenContext, } from './contexts';

import RouterAppComponent from './components/RouterAppComponent';
import RightNavBox from './components/RightNavBox';
import RootModals from './components/RootModals';
import { user_ID } from './components/constants/constants';

import { AuthAPI } from './APIs/AuthApi';
import { UserTypesValues } from './types/UserTypeValues';
import { toast } from 'react-toastify';
type toggleIsOpen = () => void;

function App() {
  const userContext = React.useContext(RootUserContext)
  const userTokenContext = React.useContext(RootUserTokenContext)

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isOpenUser, setIsOpenUser] = React.useState<boolean>(false)
  const [isOpenResearch, setIsOpenResearch] = React.useState<boolean>(false)
  const toggleIsOpenUser: toggleIsOpen = () => setIsOpenUser(!isOpenUser)
  const toggleIsOpen: toggleIsOpen = () => setIsOpen(!isOpen)
  const closeIsOpen: toggleIsOpen = () => setIsOpen(false)
  const [isShownModalsSignIn, setIsShownModalsSignIn] = React.useState<boolean>(false)
  const [isShownModalsFirstSignIn, setIsShownModalsFirstSignIn] = React.useState<boolean>(false)
  const [userIsNull, setUserIsNull] = React.useState<boolean>(false)
  const [isShownModalsLogOut, setIsShownModalsLogOut] = React.useState<boolean>(false)

  const loadToken = () => {
    let resultToken = () => (localStorage.getItem("userToken"));
    let getted = (resultToken())
    if (getted) {
      userTokenContext?.setToken(getted)
    }
  }

  const loadOrNotToken = () => {
    let respAuth = new AuthAPI()
    if (userTokenContext.token !== "") {
      let token = userTokenContext.token
      respAuth
        .retrive_me__account(token)
        .then(res => {
          if (Boolean(res?.id)) {
            userContext?.setUser(res)
            localStorage.setItem('userToken', userTokenContext.token);
            setIsShownModalsSignIn(false)
          }
        })
    }


  }

  const responseGoogle = (response: any): void => {
    if (response.credential) {

      let { email, account_balance_btc, account_balance_eth, id,
        image, is_staff, is_superuser, pseudo, name }: UserTypesValues = jwt_decode(response.credential)

      let dataStructured: UserTypesValues = {
        email: email,
        account_balance_btc: account_balance_btc,
        account_balance_eth: account_balance_eth,
        id: id,
        is_staff: is_staff,
        is_superuser: is_superuser,
        image: image,
        pseudo: pseudo,
        name: name,
      }

      userContext?.setUser(dataStructured)

    }

    setIsShownModalsSignIn(false)

  }

  React.useEffect(() => {
    let checker = userContext?.user === null
    setUserIsNull(checker)
  }, [userContext])


  React.useEffect(() => {
    loadOrNotToken()
  }, [userTokenContext.token])



  React.useEffect(() => {
    loadToken()
  }, [])


  return (
    <GoogleOAuthProvider clientId={user_ID}>


      {/* {
        userIsNull && (<ImpUserLogin
          userContext={userContext} />)
      } */}


      {/* <div className="App"> */}
      <div className='holdUp'>
        <RootModals
          isShownModalsFirstSignIn={isShownModalsFirstSignIn}
          navLogin={() => {
            setIsShownModalsFirstSignIn(false)
            setIsShownModalsSignIn(true)
          }}
          navSignin={() => {
            setIsShownModalsFirstSignIn(true)
            setIsShownModalsSignIn(false)
          }}
          toggleModalsOnLogout={() => setIsShownModalsLogOut(!isShownModalsLogOut)}
          responseGoogle={responseGoogle}
          errorFuncOnLogIn={() => {
            setIsShownModalsSignIn(false)
            console.log("dfigvbfg")
          }}
          toggleOnResearch={
            () => setIsOpenResearch(false)}
          handlerLogoutFunc={() => {
            userContext?.setUser({} as any)
            userTokenContext.setToken("")
            localStorage.setItem('dataUser', JSON.stringify(null));
            localStorage.setItem('userToken', JSON.stringify(null));
            setIsShownModalsLogOut(false)
            // setTimeout(() => {
            //   document.location.reload()
            // }, 1000)
          }}
          toggleShowSignUpModal={() =>
            setIsShownModalsFirstSignIn(false)}
          isOpenResearch={isOpenResearch}
          isShownModalsLogOut={isShownModalsLogOut}
          isShownModalsSignIn={isShownModalsSignIn}
          toggleShowSigninModal={() => setIsShownModalsSignIn(false)}
        />

        <div className="flex mParent">

          <SideNavs
            handleLogOut={() => setIsShownModalsLogOut(!isShownModalsLogOut)}
            handleLog={() => setIsShownModalsSignIn(!isShownModalsSignIn)}
            isOpen={isOpen}
            toggleIsOpen={toggleIsOpen}
            closeIsOpen={closeIsOpen}
          />


          <RouterAppComponent
            isOpen={isOpen}
            isOpenUser={isOpenUser}
            controlSearch={() => setIsOpenResearch(true)}
          />

          <RightNavBox
            isOpenUser={isOpenUser}
            userContext={userContext}
            toggleIsOpenUser={toggleIsOpenUser}
            handleLogOut={() => setIsShownModalsLogOut(!isShownModalsLogOut)}
            handleLog={() => setIsShownModalsSignIn(!isShownModalsSignIn)}
            handleShow={() => setIsOpenUser(!isOpenUser)}
          />

        </div >
      </div >
      {/* </div > */}

    </GoogleOAuthProvider>
  );
}

export default App;
