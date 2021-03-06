import Header from "./Header";
import Footer from "./Footer";
import React, {useEffect} from "react";
import styles from "./login.module.css"
import {useHistory} from "react-router-dom"

const Login = ({authService}) => {

    const history = useHistory();

    const goToMaker = (userId) => {
        history.push({
            pathname: "/maker",
            state: {id: userId}
        });
    }

    const onLogin = event => {
        console.log(event.currentTarget.textContent);
        authService
            .login(event.currentTarget.textContent)
            .then(data => {
                goToMaker(data.user.uid);
            });
    }

    useEffect(() => {
        authService.onAuthChange(user => {
            user && goToMaker(user.id)
        })
    });

    return (
        <section className={styles.login}>
            <Header />
            <section>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Google</button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Github</button>
                    </li>
                </ul>
            </section>
            <Footer />
        </section>
    );
};

export default Login;