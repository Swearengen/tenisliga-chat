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
	  height: '100vh',
	},
	appBarSpacer: theme.mixins.toolbar,
    content: {
		flexGrow: 1,
		paddingTop: '65px',
		overflow: 'hidden',
		background: theme.palette.background.default,
		position: 'relative',
	},
	footer: {
        position: 'absolute' as 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
		padding: '15px 30px',
		background: theme.palette.background.default,
		borderTop: '1px solid #c5c5c5'
    },
})

export const DRAWER_WIDTH = 340;


interface Props extends WithStyles<typeof styles> {
	store: Store
}

interface State {
	open: boolean
}

@observer
class Dashboard extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			open: true,
		}
	}

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
		store.chatkitUser.sendSimpleMessage({
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
					{
						!_.isEmpty(store.messages) &&
						!_.isEmpty(store.roomUsers) &&
						<div>
							<MessagesList
								messages={store.messages!}
								roomUsers={store.roomUsers!}
								currentUser={store.currentUser!}
							/>
						</div>
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