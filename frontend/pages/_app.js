import Head from 'next/head';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function CRUD({ Component, pageProps }) {
  return <>
    <Layout>
      <Head>
        <title>CRUD APP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default CRUD
