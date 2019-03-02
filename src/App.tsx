import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react';

import Store from './store/store';

import Dashboard from './dashboard/Dashboard'

interface Props {
  store: Store
}

@observer
class App extends React.Component<Props> {

  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      userId: ''
    }
  }

  componentDidMount() {
    this.props.store.updateTest();
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
    return (
      <React.Fragment>
        <CssBaseline />
        <Dashboard testStore={this.props.store.test} />
      </React.Fragment>
    )
  }

}

export default App;
