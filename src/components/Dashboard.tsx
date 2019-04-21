import React from 'react';
import * as _ from 'lodash'

import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import { Store } from '../store/store';
import { Loader } from '../components/utils/Loader';
import { ErrorPage } from '../components/utils/ErrorPage';
// import AppHeader from './Header'
// import Sidebar from './Sidebar/Sidebar';
// import MessagesList from './Messages/MessagesList';
import MessageForm from './messages/MessageForm';
import TypingIndicator from './messages/TypingIndicator';

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
    userName: string
    userId: string
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

	componentDidMount() {
		const { store } = this.props

			console.log('prefetching');

			// dohvatit usera s tim userNameom i userId-om
			// ako ne postoji, ispisat error
			// ako postoji spremit userId u store

			// loadat userJoinedRooms i cursors, spremit ih u state
			// nakon toga pozvat connectUser

		if (window.innerWidth < 790) {
			this.setState({
				open: false
			})
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	onMessageFormChange = (text: string) => {
		this.props.store.setMessageToSend(text)
	}

	sendMessage = () => {
		this.props.store.sendMessage()
	}

	render() {
		const { classes } = this.props
		const { store } = this.props

		if (store.loading) {
			return (
				<Loader />
			)
		}

		if (store.errorMessage) {
			return (
				<ErrorPage>{store.errorMessage}</ErrorPage>
			)
		}

		return (
			<div className={classes.root}>

				{/* <AppHeader
					open={this.state.open}
					shouldDisplayNotification={store.shouldDisplayHeaderNotification}
					handleDrawerOpen={this.handleDrawerOpen}
					currentRoom={store.currentRoom!}
				/>
				<Sidebar
					open={this.state.open}
					currentRoomId={store.currentRoomId!}
					userId={this.props.userId}
					publicRooms={store.publicRooms}
					privateRooms={store.privateRooms}
					notificationsCollection={store.notificationsCollection}
					leagueRoom={store.leagueRoom}
					leagueUsers={store.usersFromLeagueRoom}
					handleDrawerClose={this.handleDrawerClose}
					changeRoom={store.changeRoom}
					leagueUserClicked={store.leagueUserClicked}
					presenceData={toJS(store.presenceData)}
				/> */}

				<main className={classes.content}>
					{
						!_.isEmpty(store.messages) &&
						!_.isEmpty(store.currentRoom) &&
						<div>
							messages list
							{/* <MessagesList
								messages={store.messages!}
								roomUsers={store.currentRoom!.users}
								userId={this.props.userId}
								lastMessageId={store.getLastMessageId}
								currentRoomId={store.currentRoomId!}
								loadingOlder={store.loadingOlderMessages}
								onSetCursor={store.setCursor}
								loadOlder={store.loadOlderMessages}
							/> */}
						</div>
					}
					<div className={classes.footer}>
						<TypingIndicator usersWhoAreTyping={store.usersWhoAreTypingInRoom} />
						<MessageForm
							value={store.messageToSend}
							onChange={this.onMessageFormChange}
							onSubmit={this.sendMessage}
						/>
					</div>
				</main>

			</div>
		);
	}
}

export default withStyles(styles)(Dashboard)