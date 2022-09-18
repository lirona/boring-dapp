import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import AppStateProvider from '../context/AppStateProvider';
import { ToastContainer } from 'react-toastify';



function MyApp({ Component, pageProps }) {
  return (
    <AppStateProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </Layout>
    </AppStateProvider>
  );
}

export default MyApp
