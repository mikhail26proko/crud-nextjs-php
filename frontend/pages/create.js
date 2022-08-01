import Image from 'next/image'
import Create from '../components/Create';
import styles from '../styles/Home.module.scss'

export const getServerSideProps = async () => {
  
  const response = await fetch("http://server:80",{
      method: 'POST',
      body: JSON.stringify({"method":"readAllHead","data":""}),
    });
    const dataAll = await response.json();
    

  if (!dataAll) {
    return {
      notFound:true,
    }
  }

  return {
    props: { 
      dataAll: dataAll
    },
  }
}

const CreateCompany = ( { dataAll} ) => {
  return <>
    <div className={styles.wrapper}>
      <Create 
        dataAll = { dataAll }
      />
    </div>
  </>
}
export default CreateCompany;