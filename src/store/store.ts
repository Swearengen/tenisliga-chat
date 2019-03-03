import { observable, action, runInAction } from 'mobx';

export interface CurrentUser {
    userName: string;
    userId: string;
}

export default class Store {
    @observable currentUser?: CurrentUser;
    @observable status?: number;
    @observable initialErrorMessage?: string;
    @observable initialLoading: boolean = false;

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
            console.error('error', error)
            runInAction(() => {
                this.status = error.status
                this.initialLoading = false
                this.initialErrorMessage = 'Server Error'
            })
        })
    }
}