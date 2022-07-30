import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import Image from "next/image";

const navigation = [
    { id: 1, title: 'All', path: '/' },
    { id: 2, title: 'Create', path: '/create' },
    { id: 3, title: 'About', path: '/about' },    
];

const Navbar = () => {
    const { pathname } = useRouter()

    return <>
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Image
                    src="/logo.jpg"
                    width={60}
                    height={60}
                    className={styles.logo}
                    alt={"myLogo"}
                />
            </div>
            <div className={styles.links}>
                {navigation.map(({id, title, path})=>(
                    <>
                        <Link key={id} href={path}>
                            <a className={pathname===path ? styles.active :null }>
                                {title}
                            </a>
                        </Link>
                    </>
                ))}
            </div>
        </nav>
    </>
}

export default Navbar;