import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react';
import * as _ from 'lodash';

import Store from './store/store';
import Dashboard from './components/Dashboard'
import { ErrorPage } from './components/ErrorPage';

import { getUrlParam } from './utils/urlParams'

interface Props {
  store: Store
}

@observer
class App extends React.Component<Props> {

  componentDidMount() {
    const { store } = this.props

    const userName = getUrlParam('userName')
    const userId = getUrlParam('userId')

    if (userName && userId) {
	  store.setCurrentUser(userName, userId)
	  store.createChatkitUser(userName, userId)
    } else {
		store.setInitialErrorMessage('Please provide userName and userId')
	}
  }

  render() {
    const { store } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        {store.initialErrorMessage ? (
			<ErrorPage>{store.initialErrorMessage}</ErrorPage>
		) : (
			<Dashboard store={this.props.store} />
        )}
      </React.Fragment>
    )
  }

}

export default App;
