import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {NextUIProvider} from "@nextui-org/react";
import {store} from "@/store/store";
import { Provider } from 'react-redux'
export default function App({ Component, pageProps }: AppProps) {
  return (
        <Provider store={store}>
            <NextUIProvider>
                <Component {...pageProps} />
            </NextUIProvider>
        </Provider>
  )
}
