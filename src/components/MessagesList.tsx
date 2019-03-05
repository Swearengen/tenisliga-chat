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

import { formatMessageDate } from '../utils/general'

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
    }
});

interface Props extends WithStyles<typeof styles> {
    messages: Message[];
    roomUsers: RoomUser[];
    currentUser: CurrentUser;
}

@observer
class MessagesList extends React.Component<Props> {

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
                            {message.text}
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
                            {message.text}
                        </Typography>
                    }
                />
            </ListItem>
        )
    }




    render() {
        return (
            <List>
                {this.props.messages.map((message) => (
                    message.senderId === this.props.currentUser.userId ? (
                        this.renderOwnMessages(message)
                    ) : (
                        this.renderOtherUserMessage(message)
                    )
                ))}
            </List>
        )
    }
}

export default withStyles(styles)(MessagesList)