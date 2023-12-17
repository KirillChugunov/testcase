import {useLocation} from "react-router-dom";
import styles from "./errorPage.module.css";

const ErrorPage = () => {
    const locationState = useLocation().state;
    return (
        <h1 className={styles.error__title}>Произошла ошибка, код ошибки: {locationState.error}</h1>
    )
}

export default ErrorPage;