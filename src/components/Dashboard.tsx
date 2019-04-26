import React from 'react';
import * as _ from 'lodash'

import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import { Loader } from '../components/utils/Loader';
import { ErrorPage } from '../components/utils/ErrorPage';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';
import MessagesList from './messages/MessagesList';
import MessageForm from './messages/MessageForm';
import TypingIndicator from './messages/TypingIndicator';
import { InitialData } from '../store/types';
import ChatModel from '../store/chatModel';

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
}

interface InjectedProps extends Props {
    chatModel: ChatModel
}

interface State {
	open: boolean
}

@inject('chatModel')
@observer
class Dashboard extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			open: true,
		}
	}

	get injected() {
        return this.props as InjectedProps;
    }

	componentDidMount() {
		const { userId, userName } = this.props
		const { chatModel } = this.injected

		chatModel.loadInitialData(userName, userId)
			.then((data: InitialData) => {
				if (_.isEmpty(data.user)) {
					chatModel!.setErrorMessage("Please Provide correct userName and userId")
				} else {
					chatModel!.setUserJoinedRoom(data.userRooms)
					chatModel!.setInitialCursorCollection(data.userCursors)
					chatModel!.connectUser(userId)
				}
			})
			.catch((error) => {
				console.log(error);
			})

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
		this.injected.chatModel.setMessageToSend(text)
	}

	sendMessage = () => {
		this.injected.chatModel.sendMessage()
	}

	render() {
		const { classes } = this.props
		const { chatModel } = this.injected

		if (chatModel.loading) {
			return (
				<Loader />
			)
		}

		if (chatModel!.errorMessage) {
			return (
				<ErrorPage>{chatModel!.errorMessage}</ErrorPage>
			)
		}

		return (
			<div className={classes.root}>

				<Header
					open={this.state.open}
					shouldDisplayNotification={chatModel!.shouldDisplayHeaderNotification}
					handleDrawerOpen={this.handleDrawerOpen}
					currentRoom={chatModel!.currentRoom!}
				/>
				<Sidebar
					open={this.state.open}
					currentRoomId={chatModel.currentRoomId!}
					userId={this.props.userId}
					publicRooms={chatModel.publicRooms}
					privateRooms={chatModel.privateRooms}
					notificationsCollection={chatModel.notificationsCollection}
					leagueRoom={chatModel.leagueRoom}
					leagueUsers={chatModel.usersFromLeagueRoom}
					handleDrawerClose={this.handleDrawerClose}
					changeRoom={chatModel.changeRoom}
					leagueUserClicked={chatModel.leagueUserClicked}
					presenceData={toJS(chatModel.presenceData)}
				/>

				<main className={classes.content}>
					{
						!_.isEmpty(chatModel.messages) &&
						!_.isEmpty(chatModel.currentRoom) &&
						<div>
							<MessagesList
								messages={chatModel.messages!}
								roomUsers={chatModel.currentRoom!.users}
								userId={this.props.userId}
								lastMessageId={chatModel.getLastMessageId}
								currentRoomId={chatModel.currentRoomId!}
								loadingOlder={chatModel.loadingOlderMessages}
								onSetCursor={chatModel.setCursor}
								loadOlder={chatModel.loadOlderMessages}
							/>
						</div>
					}
					<div className={classes.footer}>
						<TypingIndicator usersWhoAreTyping={chatModel!.usersWhoAreTypingInRoom} />
						<MessageForm
							value={chatModel.messageToSend}
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