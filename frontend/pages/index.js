import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export const getStaticProps = async () => {
  
  const response = await fetch("http://server:80",{
    method: 'POST',
    body: JSON.stringify({"method":"readAll","data":""}),
  });
  const data = await response.json();
  return {
    props: { data: data },
  }
}



const Home = ({ data }) => {
  return <>
    <div className={styles.wrapper}>
      <ul>
        {data & data.map(({id, full_name})=>{console.log(id, full_name)})}
        {data & data.map(({id, full_name})=>{
          return (
            <li key={id}>
              {full_name}
            </li>)
        })}
      </ul>
    </div>
  </>
}

export default Home;