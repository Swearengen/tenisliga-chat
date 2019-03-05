import { observable, action, runInAction, reaction, toJS } from 'mobx';
// import Chatkit from '@pusher/chatkit-client'
const Chatkit = require('@pusher/chatkit-client'); // todo: why import is not working
import * as _ from 'lodash'

import { CurrentUser, Room, Message, RoomUser } from './types'

export default class Store {
    @observable currentUser?: CurrentUser;
    @observable status?: number;
    @observable initialErrorMessage?: string;
    @observable initialLoading: boolean = false;

    @observable chatkitUser: Object = {}
    @observable currentRoom?: Room
    @observable messages?: Message[]
    @observable roomUsers?: RoomUser[]

    @action
    setCurrentUser = (userName: string, userId: string) => {
        this.currentUser = {userName, userId}
    }

    @action
    setInitialErrorMessage = (errorMessage: string) => {
        this.initialErrorMessage = errorMessage
    }

    @action
    public createChatkitUser = (userName: string, userId: string) => {
        this.initialLoading = true

        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, userId })
        })
        .then(response => {
            runInAction(() => {
                this.status = response.status
                this.initialLoading = false
                this.initialErrorMessage = undefined
            })
        })
        .catch(error => {
            runInAction(() => {
                this.status = error.status
                this.initialLoading = false
                this.initialErrorMessage = 'Server Error'
            })
        })
    }

    @action
    public connectUserRequest = () => {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:99cebb3b-bac8-4c5c-bcd1-cabf14849b0a',
            userId: this.currentUser!.userId,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate',
            }),
        })

        chatManager
            .connect()
            .then((currentUser: any) => {
                this.chatkitUser = currentUser


                currentUser.subscribeToRoom({
                    roomId: "19392708",
                    messageLimit: 100,
                    hooks: {
                        onMessage: (message: Message) => {
                            this.messages = this.messages ? [...this.messages, message] : [message]
                        }
                    },
                })
                .then((currentRoom: Room) => {
                    this.currentRoom = currentRoom
                    _.forEach(currentUser.users, (value) => {
                        let roomUser = toJS(value)
                        this.roomUsers = this.roomUsers ? [...this.roomUsers, roomUser] : [roomUser]
                    });


                })
            })
            .catch((error: any) => {
                console.error('error', error)
            })
    }

    public connectUser = _.once(this.connectUserRequest)
}