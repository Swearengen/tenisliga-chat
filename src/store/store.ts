import { observable, action, runInAction, reaction } from 'mobx';
// import Chatkit from '@pusher/chatkit-client'
const Chatkit = require('@pusher/chatkit-client'); // todo: why import is not working
import * as _ from 'lodash'

import { CurrentUser, Room, Message, RoomUser } from './types'

export default class Store {
    @observable currentUser?: CurrentUser;
    @observable status?: number;
    @observable initialErrorMessage?: string;
    @observable initialLoading: boolean = false;

    @observable chatkitUser: any = {}
    @observable currentRoom?: Room
    @observable messages?: Message[]
    @observable roomUsers?: RoomUser[]
    @observable usersWhoAreTyping: string[] = []

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

                // 1. popis idejava svih soba treba dohvatit na serveru, metoda je getUserRooms
                    // proc kroz popis i u channels dodat sve sobe koje su public i koji su sobe od svake lige (customData neki)
                    // ostale su znaci privatne poruke

                // 2. postavit na pocetku da je currentRoom general soba

                // 3. tu se subscrijba i dodaje u general sobu
                    // trebalo bi tu subscrijabat na sve sobe
                    // u onMessage hook metodi odoavat message u store po id-ju
                    // u started i stoped typing metodama zapisivat u store samo ako je trenutni id jednak currentRoom id-ju

                // 4. kad netko zeli promjenit sobu klikajuci po kanalima
                // samo mjenjam currentRoom i u metodi getCurrentMessages (nova metoda) vracam trenutne poruke

                // 5. kad dodam search za usere, odabirom iz dropdowna provjeravam dal postoji private soba sa tim userom
                    // ako postoji uzmem id te sobe i postavljam je kao currentRomm
                    // ako ne postoji kreiram novu sobu i postavljam je kao currentRoom

                this.chatkitUser.subscribeToRoomMultipart({
                    roomId: "19398846",
                    messageLimit: 100,
                    hooks: {
                        onMessage: (message: Message) => {
                            this.messages = this.messages ? [...this.messages, message] : [message]
                        },
                        onUserStartedTyping: (user: RoomUser) => {
                            this.usersWhoAreTyping = [...this.usersWhoAreTyping, user.name]
                        },
                        onUserStoppedTyping: (user: RoomUser) => {
                            this.usersWhoAreTyping = this.usersWhoAreTyping.filter(
                                username => username !== user.name
                            )
                        }
                    },
                })
                .then((currentRoom: Room) => {
                    this.currentRoom = currentRoom
                    _.forEach(currentUser.users, (value) => {
                        let roomUser = value
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