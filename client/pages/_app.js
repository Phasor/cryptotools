import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a react-query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Google Analytics Script */}
        <Script id="google-analytics1" async src="https://www.googletagmanager.com/gtag/js?id=G-XHW4FZR83P"></Script>
        <Script id="google-analytics2">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-XHW4FZR83P');
          `}
        </Script>

        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
