import Image from 'next/image'
import styles from '../styles/Home.module.scss'

// export const getStaticProps = async () => {
  
//   const response = await fetch("http://localhost:8080",{
//     method: 'POST',
//     body: JSON.stringify({"method":"readAll","data":""}),
//   });
//   const data = await response.json();
//   console.log(await data);
//   return {
//     props: { data: data },
//   }
// }


const Home = ({ data }) => {
  return <>
    <div className={styles.wrapper}>
        String
    </div>
  </>
}
export default Home;