
import React, { PropTypes, Component } from 'react'
import SearchBox from '../SearchBox'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'
import style from './style.css'

import {actions as userAction} from '../../redux/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AppBar extends Component {

  static propTypes = {
    title : PropTypes.string,
    displaySearch : PropTypes.bool,
  };
  constructor(props, context) {
    super(props, context)
    this.props.userAction.isLogin()
  }

  render() {
    const {
        title,
        displaySearch,
    } = this.props;
    return (
      <nav>
        <div className={style['app-bar']}>
          <div className={style['left']}>
            <img className={style['logo']}></img>
            <h2 className={style['title']}>{title}</h2>
          </div>
          <div className={style['center']}>
            { displaySearch ? <SearchBox></SearchBox> : null }
          </div>
          <div className={style['right']}>
            <span className={style['menu-item']}> Sign up / Sign in </span>
          </div>
        </div>
      </nav>
    )
  }
}


AppBar.propTypes = {
  // addTodo: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    userAction: bindActionCreators(userAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)
