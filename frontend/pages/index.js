import styles from '../styles/Home.module.scss'

export const getStaticProps = async () => {
  
  const response = await fetch("http://server:80",{
    method: 'POST',
    body: JSON.stringify({"method":"readAllHead","data":""}),
  });
  const data = await response.json();
  return {
    props: { data: data },
  }
}

const Home = ({ data }) => {
  return <>
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <td> ID </td>
          <td> HID </td>
          <td> FULL NAME </td>
          <td> ADDRESS </td>
          <td> Phone </td>
          <td> Have a child </td>
        </thead>
        <tbody>
          {data && data.map( ( { id, hid, full_name, address, phone, ch } ) => (
              <tr key = { id } >
                <td> { id } </td>
                <td> { hid } </td>
                <td> { full_name } </td>
                <td> { address } </td>
                <td> { phone } </td>
                <td> { ch } </td>
              </tr>
          ) ) } 
         </tbody>
      </table>
    </div>
  </>
}

export default Home;