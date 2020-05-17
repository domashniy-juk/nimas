import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styles from '../styles/list.module.css'

const Admin = () => {

    const updateApi = () => fetch('api/updateBiggeek');

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" >
                        Nimas
                </Typography>
                </Toolbar>
            </AppBar>
            <h1 className={styles.listTitle}>Админка</h1>
            <Button onClick={updateApi}>жмакни</Button>
        </>
    )
}

export default Admin;