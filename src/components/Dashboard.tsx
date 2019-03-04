import React from 'react';
import * as _ from 'lodash'

import { observer } from 'mobx-react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey'

import Store from '../store/store';
import { Loader } from './Loader';
import AppHeader  from './AppHeader'
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';



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
	  background: theme.palette.background.default
    },
})

export const DRAWER_WIDTH = 340;


interface Props extends WithStyles<typeof styles> {
	store: Store
}

@observer
class Dashboard extends React.Component<Props> {
	state = {
		open: true,
	};

	componentDidUpdate() {
		const { store } = this.props
		if (store.currentUser) {
			store.connectUser()
		}
	}

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

				<AppHeader open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />
				<Sidebar open={this.state.open} handleDrawerClose={this.handleDrawerClose} />

				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					{/* <Typography variant="h4" gutterBottom component="h2">
						{this.props.store.status}
					</Typography> */}
					{!_.isEmpty(store.messages) && <MessagesList messages={store.messages!} />}
				</main>

			</div>
		);
	}
}

export default withStyles(styles)(Dashboard)