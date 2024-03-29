import React from 'react';

import { withFirebase } from '../components/Firebase';

import {
  Switch,
  Route,
} from "react-router-dom";

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { AuthUserContext, withAuthentication } from '../components/Session';

import useStyles from '../config/theme.dashboard';
import Copyright from '../components/Copyright';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/Calendar';
import { blue } from '@material-ui/core/colors';

function Dashboard(props) {
//   let match = useRouteMatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

const signOut = () => {
    props.firebase.doSignOut();
};
  
  return (
    <AuthUserContext.Consumer>
    { authUser => authUser ? (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
            <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
            </Typography>
            <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
                <Typography component="p" style={{paddingRight: "15px"}}>
                username
                </Typography>
                <NotificationsIcon />
            </Badge>
            </IconButton>
        </Toolbar>
        </AppBar>

        <Sidebar signOut={signOut} open={open} handleDrawerClose={handleDrawerClose} />

        <main className={classes.content }>
        <div className={classes.appBarSpacer } />
        <div style={{margin: 100}}>
        <Container maxWidth="xl" className={classes.container}>
            <Calendar firebase={props.firebase} authUser={authUser} />
            <Box pt={4}>
                <Copyright />
            </Box>
        </Container>
        </div>
        </main>
        
    </div>
) : ( <p>Not authorized!</p> ) }
    </AuthUserContext.Consumer>
  )

};

export default withAuthentication(Dashboard);
