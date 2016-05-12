
import React, { Component, PropTypes } from 'react'
import style from './style.css'
import {Snackbar} from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'

import injectTapEventPlugin from 'react-tap-event-plugin'
import '../../utils/custom-fetch'
import 'flexboxgrid';

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      snackbar: {
        open: false,
        msg: ''
      }
    }
  }

  componentDidMount(){
    this._onEventListener();
  }

  _onEventListener(){
    // Listen to the event if snackbar is toggled
    eventEmitter.addListener(EVENT_CONST.toggleSnackbar, (msg) => {
      this.setState({
        snackbar: {
          open: true,
          msg: msg
        }
      })
    })
  }

  _handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        open: false,
        msg: ''
      }
    })
  }

  render() {

    // const { todos, user, userActions, children } = this.props
    const { children } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={{'height': '100%'}}>
          {children}

          <Snackbar
            autoHideDuration={4000}
            open={this.state.snackbar.open}
            message={this.state.snackbar.msg}
            onRequestClose={this._handleSnackbarClose}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
}

// function mapStateToProps(state) {
//   return {
//     todos: state.todos,
//     user: state.user
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     userActions: bindActionCreators(userActions, dispatch),
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)

export default App
