import Image from 'next/image'
import Update from '../../components/Update';
import styles from '../../styles/Home.module.scss'

export const getServerSideProps = async (context) => {
  const {id} = context.params;
  
  const arr = {
    "method" : "read",
    "data": {id}
  }

  const response = await fetch("http://server:80",{
    method: 'POST',
    body: JSON.stringify( arr ),
  });

  const data = await response.json();
  
  const response1 = await fetch("http://server:80",{
      method: 'POST',
      body: JSON.stringify({"method":"readAllHead","data":""}),
    });
    const dataAll = await response1.json();
    

  if (!data || !dataAll) {
    return {
      notFound:true,
    }
  }

  return {
    props: { 
      data: data ,
      dataAll: dataAll
    },
  }
}

const UpdateCompany = ( { data , dataAll} ) => {
  return <>
    <div className={styles.wrapper}>
      <Update 
        data = { data }
        dataAll = { dataAll }
      />
    </div>
  </>
}
export default UpdateCompany;