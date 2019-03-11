import React from 'react'
import * as _ from 'lodash'
import { observer } from 'mobx-react';
import cc from 'classcat'

import { Message, RoomUser, CurrentUser } from '../store/types';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import teal from '@material-ui/core/colors/teal';

import avatarPlaceholder from '../assets/avatarPlaceholder.png'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import grey from '@material-ui/core/colors/grey'

import { formatMessageDate } from '../utils/general'
import { Grid } from '@material-ui/core';

const styles = (theme: any) => ({
    messageText: {
        backgroundColor: teal[100],
        borderRadius: '50px',
        padding: '5px 10px',
        display: 'inline-block',
        '&$own': {
            backgroundColor: teal[300],
        },
    },
    own: {},
    listText: {
        flex: '0 0 auto'
    },
    listCont: {
        position: 'absolute' as 'absolute',
        height: '100%',
        overflow: 'scroll',
        left: '0',
        right: '0',
        paddingBottom: '190px',
    },
    scrollToEnd: {
        position: 'fixed' as 'fixed',
        background: grey[300],
        bottom: '150px',
        right: '20px',
        padding: '3px',
        borderRadius: '50%',
        cursor: 'pointer'
    }
});

interface Props extends WithStyles<typeof styles> {
    messages: Message[];
    roomUsers: RoomUser[];
    currentUser: CurrentUser;
}

interface State {
	messagesScrolled: boolean
}

@observer
class MessagesList extends React.Component<Props, State> {

    constructor(props: Props) {
		super(props)
		this.state = {
			messagesScrolled: false,
		}
	}

    // odvojit komponentu za scroll i message
    componentWillUnmount() {
        if (this.messagesCont) {
            this.messagesCont.removeEventListener('scroll', this.handleScroll);
        }
    }

    messagesContDidMount = (node: any) => {
        this.messagesCont = node
        const { height } = node.getBoundingClientRect()
        const scrollHeight = node.scrollHeight
        if (scrollHeight === height) {
            this.setState({messagesScrolled: true})
        }
        this.messagesCont.addEventListener("scroll", this.handleScroll)
    }

    handleScroll = _.debounce((event: any) => {
        const { scrollTop, offsetHeight, scrollHeight } = event.srcElement
        if (scrollTop + offsetHeight === scrollHeight) {
            this.setState({ messagesScrolled: true })
        } else {
            this.setState({ messagesScrolled: false })
        }
    }, 150);

    messagesCont: any = React.createRef()

    scrollToBottom = () => {
        this.messagesCont.scroll({top: this.messagesCont.clientHeight})
    }

    getSenderName = (senderId: string) => {
        let sender = _.find(this.props.roomUsers, {id: senderId}) as RoomUser
        return sender ? sender.name : ''
    }

    renderOtherUserMessage = (message: Message) => {
        return (
            <ListItem key={message.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                </ListItemAvatar>
                <ListItemText className={this.props.classes.listText}
                    primary={
                        <Typography component="div" variant="caption">
                            <strong>{this.getSenderName(message.senderId)}</strong>: {formatMessageDate(message.createdAt)}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" className={this.props.classes.messageText}>
                            {message.parts[0].payload.content}
                        </Typography>
                    }
                />
            </ListItem>
        )
    }

    renderOwnMessages = (message: Message) => {
        const { classes } = this.props
        return (
            <ListItem key={message.id} style={{justifyContent: 'flex-end'}}>
                <ListItemText className={this.props.classes.listText}
                    primary={
                        <Typography component="div" variant="caption">
                            {formatMessageDate(message.createdAt)}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" className={cc([classes.messageText, classes.own])}>
                            {message.parts[0].payload.content}
                        </Typography>
                    }
                />
            </ListItem>
        )
    }

    render() {
        return (
            <div className={this.props.classes.listCont} ref={this.messagesContDidMount}>
                <Grid container justify = "center">
                    <Grid item xs={10}>
                        <List>
                            {this.props.messages.map((message) => (
                                message.senderId === this.props.currentUser.userId ? (
                                    this.renderOwnMessages(message)
                                ) : (
                                    this.renderOtherUserMessage(message)
                                )
                            ))}
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                                </ListItemAvatar>
                                <ListItemText className={this.props.classes.listText}
                                    primary={
                                        <Typography component="div" variant="caption">
                                            <strong>fsdfds</strong>: dsfdsf
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" className={this.props.classes.messageText}>
                                            fdsfsd
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                {!this.state.messagesScrolled &&
                    <div className={this.props.classes.scrollToEnd} onClick={this.scrollToBottom}>
                        <KeyboardArrowDown />
                    </div>
                }
            </div>
        )
    }
}

export default withStyles(styles)(MessagesList)