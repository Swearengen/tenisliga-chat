import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

import Store from './store/store';
import Dashboard from './components/dashboard/Dashboard'
import { ErrorPage } from './components/errorPage';

import { getUrlParam } from './utils/urlParams'

interface Props {
  store: Store
}

@observer
class App extends React.Component<Props> {

  componentDidMount() {
    const { store } = this.props
    store.updateTest();

    const userName = getUrlParam('userName')
    const userId = getUrlParam('userId')

    if (userName && userId) {
      store.setCurrentUser(userName, userId)
    }

    // fetch('http://localhost:3001/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username: 'uuusername' })
    // })
    // .then(response => {
    //   this.setState({
    //     currentUsername: username
    //   })
    // })
    // .catch(error => console.error('error', error))
  }

  render() {
    const { store } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        {!_.isEmpty(store.currentUser) ? (
          <Dashboard testStore={this.props.store.test} />
        ) : (
			<ErrorPage>Please provide userName and userId</ErrorPage>
        )}
      </React.Fragment>
    )
  }

}

export default App;
