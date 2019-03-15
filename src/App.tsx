import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import deepPurple from '@material-ui/core/colors/deepPurple'
import grey from '@material-ui/core/colors/grey'

import Store from './store/store';
import Dashboard from './components/Dashboard'
import { ErrorPage } from './components/UtilComponents/ErrorPage';

import { getUrlParam } from './utils/urlParams'

const theme = createMuiTheme({
	palette: {
		primary: { main: teal[700] },
		secondary: { main: deepPurple[500] },
		background: { default: grey[200] },
		error: { main: '#D84315' }
	},
	typography: {
		useNextVariants: true,
	},
});

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
		<MuiThemeProvider theme={theme}>
			<React.Fragment>
				<CssBaseline />
				{store.initialErrorMessage ? (
					<ErrorPage>{store.initialErrorMessage}</ErrorPage>
				) : (
					<Dashboard store={this.props.store} />
				)}
			</React.Fragment>
		</MuiThemeProvider>
    )
  }

}

export default App;
