import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <ApolloProvider client={client}>
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
        <Script
          id="google-analytics1"
          strategy="afterInteractive" 
          src="https://www.googletagmanager.com/gtag/js?id=G-BFYE8M0LZL"
        />
        <Script
          id="google-analytics2"
          strategy="afterInteractive" 
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-BFYE8M0LZL');
          `}
        </Script>

        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
