import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/index.css';
import '../styles/main.css';
import { Layout } from '../components';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div dir="rtl">
      <Head>
        <title>دنیای موزیک</title>
        <meta 
          name='description'
          content='دنیای موزیک ارائه دهنده ی جدیدترین و بهترین موزیک های دنیا'
        />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  )
}

export default MyApp
