import React from 'react'

import { Message } from '../store/types';

import { withStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import avatarPlaceholder from '../assets/avatarPlaceholder.png'

const styles = (theme: any) => ({
    root: {

    },
    inline: {
      display: 'inline',
    },
  });

interface Props extends WithStyles<typeof styles> {
    messages: Message[];
}

 class MessagesList extends React.Component<Props> {
    render() {
        const { classes } = this.props

        return (
            <List className={classes.root}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={avatarPlaceholder} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                    sender Name:
                                </Typography>
                                {"datetime"}
                            </React.Fragment>
                        }
                        secondary="message text"
                    />
                </ListItem>
            </List>
            // <div>
            //     <ul>
            //         {this.props.messages.map((message, index) => (
            //             <li key={index}>
            //                 <div>sender: {message.senderId}</div>
            //                 <p>{message.text}</p>
            //             </li>
            //         ))}
            //     </ul>
            // </div>
        )
    }
}

export default withStyles(styles)(MessagesList)