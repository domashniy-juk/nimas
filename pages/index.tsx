import React, {useEffect} from "react";
import {AppBar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));


const Home = () => {

    const classes = useStyles();

    useEffect(() => {
        fetch('api/getBiggeek').then(it => it.json()).then(it => console.log(it))
    }, [])

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    NIMAS
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Home;