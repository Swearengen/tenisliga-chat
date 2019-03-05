import React from 'react';
import * as _ from 'lodash'

import { observer } from 'mobx-react';
import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import Store from '../store/store';
import { Loader } from './Loader';
import AppHeader  from './AppHeader'
import Sidebar from './Sidebar';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';



const styles = (theme: any) => createStyles({
    root: {
      display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
	  paddingTop: theme.spacing.unit * 3,
	  paddingBottom: '100px',
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

	sendTypingEvent() {
	    // this.state.currentUser
	    //   .isTypingIn({ roomId: this.state.currentRoom.id })
	    //   .catch(error => console.error('error', error))
	}

	sendMessage(text: string) {
		console.log(text);

		// this.state.currentUser.sendMessage({
		//   text,
		//   roomId: this.state.currentRoom.id,
		// })
	}

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
					{
						!_.isEmpty(store.messages) &&
						!_.isEmpty(store.roomUsers) &&
						<MessagesList
							messages={store.messages!}
							roomUsers={store.roomUsers!}
							currentUser={store.currentUser!}
						/>
					}
					<MessageForm onChange={this.sendTypingEvent} onSubmit={this.sendMessage} />
				</main>

			</div>
		);
	}
}

export default withStyles(styles)(Dashboard)