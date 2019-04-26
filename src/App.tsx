import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as _ from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import deepPurple from '@material-ui/core/colors/deepPurple'
import grey from '@material-ui/core/colors/grey'

import Dashboard from './components/Dashboard'
import { ErrorPage } from './components/utils/ErrorPage';

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

interface State {
	userName?: string
	userId?: string
}

class App extends React.Component<{}, State> {

	state: State = {}

	componentDidMount() {

		const userName = getUrlParam('userName')
		const userId = getUrlParam('userId')

		this.setState({
			userId, userName
		})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<React.Fragment>
					<CssBaseline />
					{!this.state.userId || !this.state.userName ? (
						<ErrorPage>Please provide UserName and UserId</ErrorPage>
					) : (
						<Dashboard userId={this.state.userId} userName={this.state.userName} />
					)}
				</React.Fragment>
			</MuiThemeProvider>
		)
	}

}

export default App;