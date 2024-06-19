import "@/styles/globals.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nprogress from "nprogress";
import "nprogress/nprogress.css"

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      <ToastContainer limit={4}/>
      <Footer/>
    </Provider>
    </SessionProvider>
  );
}