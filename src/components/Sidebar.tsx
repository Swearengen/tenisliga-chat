import React from 'react'
import cc from "classcat"

import { WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { DRAWER_WIDTH } from './Dashboard'

export const styles = (theme: any) => createStyles({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
            width: 0,
            display: 'none',
        [theme.breakpoints.up('sm')]: {
                display: 'block',
          width: theme.spacing.unit * 9,
        },
      }
})

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    handleDrawerClose: () => void
}

class Sidebar extends React.Component<Props> {

    render () {
        const { classes } = this.props

        return (
            <Drawer
                variant="permanent"
                classes={{ paper: cc([classes.drawerPaper, !this.props.open && classes.drawerPaperClose]) }}
                open={this.props.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />

                <List>
                    <div>
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Orders" />
                        </ListItem>
                    </div>
                </List>
                <Divider />

                <List>
                    <ListSubheader inset>Saved reports</ListSubheader>
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(Sidebar)