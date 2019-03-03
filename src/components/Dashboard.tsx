import React from 'react';
// import cc from "classcat"
import { observer } from 'mobx-react';
import { WithStyles, withStyles, MuiThemeProvider, createMuiTheme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Store from '../store/store';
import { Loader } from './Loader';
import AppHeader  from './AppHeader'
import Sidebar from './Sidebar';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#00897B' },
		secondary: { main: '#F3E5F5' },
		error: { main: '#D84315' }
	},
	typography: {
		useNextVariants: true,
	},
});

const styles = (theme: any) => createStyles({
    root: {
      display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
})

export const DRAWER_WIDTH = 240;


interface Props extends WithStyles<typeof styles> {
	store: Store
}

@observer
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
		const { classes } = this.props
		const { store } = this.props

		if (store.initialLoading) {
			return (
				<Loader />
			)
		}

		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={theme}>

					<AppHeader open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />
					<Sidebar open={this.state.open} handleDrawerClose={this.handleDrawerClose} />

					<main className={classes.content}>
						<div className={classes.appBarSpacer} />
						<Typography variant="h4" gutterBottom component="h2">
							{this.props.store.status}
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