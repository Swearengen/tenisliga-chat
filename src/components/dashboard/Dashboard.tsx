import React from 'react';
import cc from "classcat"

import { WithStyles, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { styles } from './dashboardStyles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00897B' }, // Purple and green play nicely together.
		secondary: { main: '#F3E5F5' }, // This is just green.A700 as hex.
		error: { main: '#D84315' }
	},
	typography: {
    useNextVariants: true,
  },
});


interface Props extends WithStyles<typeof styles> {
	testStore: string
}

class Dashboard extends React.Component<Props> {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
				<MuiThemeProvider theme={theme}>
					<AppBar
						position="absolute"
						className={cc([classes.appBar, this.state.open && classes.appBarShift])}
						>
						<Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={cc([classes.menuButton, this.state.open && classes.menuButtonHidden])}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								component="h1"
								variant="h6"
								color="inherit"
								noWrap
								className={classes.title}
								>
								Dashboard
							</Typography>
							<IconButton color="inherit">
								<Badge badgeContent={4} color="error">
									<NotificationsIcon />
								</Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						classes={{paper: cc([classes.drawerPaper, !this.state.open && classes.drawerPaperClose])}}
						open={this.state.open}
						>
						<div className={classes.toolbarIcon}>
							<IconButton onClick={this.handleDrawerClose}>
								<ChevronLeftIcon />
							</IconButton>
						</div>
						<Divider />

						<List>
							<div>
								<ListItem button>
									<ListItemIcon>
										<DashboardIcon />
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</ListItem>
								<ListItem button>
									<ListItemIcon>
										<ShoppingCartIcon />
									</ListItemIcon>
									<ListItemText primary="Orders" />
								</ListItem>
							</div>
						</List>
						<Divider />

						<List>
							<ListSubheader inset>Saved reports</ListSubheader>
						</List>
					</Drawer>
					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Typography variant="h4" gutterBottom component="h2">
							{this.props.testStore}
						</Typography>
						<Typography variant="h4" gutterBottom component="h2">
							Products
						</Typography>
					</main>
				</MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard)