import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const About = () => {
  return <>
    <div className={styles.wrapper}>
      <div className={styles.cloud}>
        It's a simple CRUP WEB APP
        <br/>
          List all entries on the All tab
        <br/>
          You can create a new entry on the Create tab
      </div>
      <div className={styles.cloud}>
        <ul className={styles.ulli}>
          <h4>Three buttons:</h4>
          <li><KeyboardArrowDownIcon/> Expand</li>
          <li><EditIcon/> Edit</li>
          <li><DeleteIcon/> Delete</li>
        </ul>
      </div>
    </div>
  </>
}

export default About;