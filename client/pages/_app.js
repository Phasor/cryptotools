import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ToastContainer } from 'react-toastify';

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
  uri: "http://localhost:5000/graphql",
  cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
