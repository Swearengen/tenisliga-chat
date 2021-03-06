import * as React from 'react';
import * as _ from 'lodash'
import cc from 'classcat'

import DraftsIcon from '@material-ui/icons/Drafts'

import { ListItem, ListItemText } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { SubscribedRoom, RoomUser, PresenceData, PrivateSubscribedRoom } from '../../store/types';

const styles = (theme: any) => ({
    nestedListItem: {
        paddingLeft: '25px',
        '&$selected': {
            color: '#3c3c3c',
            fontWeight: 900
        },
        '&$disabled': {
            background: 'none',
            cursor: 'pointer',
            pointerEvents: 'inherit' as 'inherit',
            opacity: 1,
            '&:hover': {
                background: 'rgba(0, 0, 0, 0.08)'
            }
        }
    },
    presence: {
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        border: '1px solid #555',
        '&$selected': {
            backgroundColor: theme.palette.primary.light,
            border: `1px solid ${theme.palette.primary.light}`,
        }
    },
    selected: {},
    disabled: {},
    secondary: {
        color: 'inherit',
        fontWeight: 'inherit' as 'inherit'
    },
    notification: {
        padding: '2px 2px 0 2px',
        backgroundColor: theme.palette.error.main,
        borderRadius: '50%'
    },
    notificationIcon: {
        fontSize: '14px',
        color: 'white'
    }
})

interface Props extends WithStyles<typeof styles> {
    item: PrivateSubscribedRoom | SubscribedRoom | RoomUser
    showNotification: boolean
    selected: boolean
    disableSelected?: boolean
    presenceData?: PresenceData
    presenceIdToCheck?: string
    onClick: (id: string) => void
}

function isPrivateSubscribedRoom(item: PrivateSubscribedRoom | SubscribedRoom | RoomUser): item is PrivateSubscribedRoom {
    return (item as PrivateSubscribedRoom).displayName !== undefined;
}

const RoomsItem: React.SFC<Props> = (props) => {

    function isPresent (id: string) {
        if (props.presenceData) {
            return props.presenceData[id] === 'online'
        }
    }

    function roomName(item: PrivateSubscribedRoom | SubscribedRoom | RoomUser) {
        if (isPrivateSubscribedRoom(item)) {
            return item.displayName
        }

        return item.name
    }

    return (
        <ListItem
            button
            selected={props.selected}
            disabled={props.disableSelected}
            classes={{
                root: props.classes.nestedListItem,
                selected: props.selected ? props.classes.selected : '',
                disabled: props.disableSelected ? props.classes.disabled : ''
            }}
            onClick={() => props.onClick(props.item.id)}
        >
            {props.presenceIdToCheck &&
                <div className={cc([props.classes.presence, isPresent(props.presenceIdToCheck) && props.classes.selected])} />
            }
            <ListItemText
                secondary={roomName(props.item)}
                classes={{secondary: props.selected ? props.classes.secondary : ''}}
            />
            {props.showNotification &&
                <div className={props.classes.notification}>
                    <DraftsIcon fontSize="small" classes={{
                        root: props.classes.notificationIcon
                    }} />
                </div>
            }
        </ListItem>
    )
}

export default withStyles(styles)(RoomsItem)