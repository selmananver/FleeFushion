import "@/styles/globals.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSession,SessionProvider } from "next-auth/react";
import Header from "./components/Header";
import Footer from './components/Footer';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </Provider>
    </SessionProvider>
  );
}