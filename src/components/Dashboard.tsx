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
import TypingIndicator from './TypingIndicator';



const styles = (theme: any) => createStyles({
    root: {
      display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
    content: {
		flexGrow: 1,
		paddingTop: theme.spacing.unit * 3,
		paddingBottom: '140px',
		height: '100vh',
		overflow: 'auto',
		background: theme.palette.background.default,
		position: 'relative'
	},
	footer: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '25px 40px',
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

	sendTypingEvent = () => {
		const { store } = this.props

		store.chatkitUser.isTypingIn({roomId: store.currentRoom!.id})
		.then(() => {
			console.log('Success')
		})
		.catch((error: any) => {
			console.log(error)
		})

	}

	sendMessage = (text: string) => {
		const { store } = this.props
		store.chatkitUser.sendMessage({
		  text,
		  roomId: store.currentRoom!.id
		})
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
					<div className={classes.footer}>
						<TypingIndicator usersWhoAreTyping={store.usersWhoAreTyping} />
						<MessageForm onChange={this.sendTypingEvent} onSubmit={this.sendMessage} />
					</div>
				</main>

			</div>
		);
	}
}

export default withStyles(styles)(Dashboard)