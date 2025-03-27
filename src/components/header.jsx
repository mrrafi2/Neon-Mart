import Logo from "./logo";
import SearchBar from "./search";
import TopSection from "./tops";
import styles from "./style/header.module.css";

export default function Header() {
    return ( 
        <div className={styles.headerContainer}>
            <div className={styles.topRow}>
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
                <div className={styles.topSection}>
                    <TopSection />
                </div>
            </div>
            <div className={styles.searchContainer}>
                <SearchBar />
            </div>
        </div>
    );
}
