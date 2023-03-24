import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from '../redux/store'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { useEffect } from 'react'
// import { Cookies } from 'react-cookie'

function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   let  getCookie = Cookies.load('access_token');
  //   console.log(getCookie)

  // }, [])


  return <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextNProgress
          color="#f72f2f"
          startPosition={0.7}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
          options={{ showSpinner: false }}
        />
        <Toaster />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  </>
}

export default MyApp
