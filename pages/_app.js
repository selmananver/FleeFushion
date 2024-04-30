import "@/styles/globals.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSession,SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </SessionProvider>
  );
}