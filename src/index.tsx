import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RootAdminEditableUserContextProvider, RootCreatorProvider, RootNFTContextProvider, RootUserContextProvider } from './contexts';
import ScrollToTop from './components/ScrollToTop';
import Initializer from './Initializer';

import { Provider } from 'react-redux';
import store from './redux/store';
import { ChakraProvider } from '@chakra-ui/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  // 
  <Provider store={store}>
    <React.StrictMode>
      {/* <ChakraProvider> */}
      <BrowserRouter>
        <Initializer>
          <RootAdminEditableUserContextProvider>
            <RootCreatorProvider>
              <RootUserContextProvider>
                <RootNFTContextProvider>
                  <ScrollToTop />
                  {/* <ScrollToTopBtn /> */}
                  <App />
                </RootNFTContextProvider>
              </RootUserContextProvider>
            </RootCreatorProvider>
          </RootAdminEditableUserContextProvider>
        </Initializer>
      </BrowserRouter>
      {/* </ChakraProvider> */}
    </React.StrictMode>
  </Provider>
  // 

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
