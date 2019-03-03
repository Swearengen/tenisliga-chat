import { observable, action } from 'mobx';

export interface CurrentUser {
    userName: string;
    userId: string;
}

export default class Store {
    @observable test: string = '1';
    @observable currentUser?: CurrentUser;

    constructor() {

    }

    @action
    setCurrentUser = (userName: string, userId: string) => {
        this.currentUser = {userName, userId}
    }

    @action
    updateTest = () => {
        setTimeout(() => {
            this.test = '2'
        }, 2000);
    }
}