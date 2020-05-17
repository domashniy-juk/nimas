import { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from '../styles/list.module.css';
import NextLink from 'next/link';

const Home = () => {

    useEffect(() => {
        fetch('api/getBiggeek').then(it => it.json()).then(it => console.log(it))
    }, [])

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        Nimas
                </Typography>
                </Toolbar>
            </AppBar>
            <h1 className={styles.listTitle}>Список доступных магазинов</h1>
            <NextLink href="/admin">aaa</NextLink>
        </>
    )
}

export default Home;