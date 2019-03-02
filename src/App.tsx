import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Dashboard from './dashboard/Dashboard'

class App extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      userId: ''
    }
  }

  componentDidMount() {
    console.log('ffff');
    this.test()
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

  private test = () => {
    console.log('gggg');

  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Dashboard />
      </React.Fragment>
    )
  }

}

export default App;
