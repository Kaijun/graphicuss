
import React, { PropTypes, Component } from 'react'
import { AppBar } from 'material-ui'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'

class Header extends Component {

  constructor(props, context) {
    super(props, context)
    this.drawerOpen = true
    eventEmitter.emit(EVENT_CONST.toggleDrawer, this.drawerOpen)
  }

  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }

  onLeftIconButtonTouchTap = (e) => {
    this.drawerOpen = !this.drawerOpen
    eventEmitter.emit(EVENT_CONST.toggleDrawer, this.drawerOpen)
  }

  render() {
    return (
      <header>
        <AppBar
          title={<span>Discuss</span>}
          onLeftIconButtonTouchTap = {this.onLeftIconButtonTouchTap}
        >
        </AppBar>
      </header>
    )
  }
}


Header.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

export default Header
