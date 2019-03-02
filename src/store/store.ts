import { observable, action } from 'mobx';

export default class Store {
    @observable test: string = '1';

    @action
    updateTest = () => {
        setTimeout(() => {
            this.test = '2'
        }, 2000);
    }
}