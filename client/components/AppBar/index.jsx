
import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import SearchBox from '../SearchBox'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'
import style from './style.css'
import { Link } from 'react-router'

import {IconButton, Avatar, FlatButton, Popover, Menu, MenuItem} from 'material-ui';

import { browserHistory } from 'react-router'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import {actions as userAction} from '../../redux/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AppBar extends Component {

  static propTypes = {
    title : PropTypes.string,
    displaySearch : PropTypes.bool,
    displayBack : PropTypes.bool,
    className: PropTypes.string,
  };
  constructor(props, context) {
    super(props, context)
    this.state = {
      profilePopover: false
    }
    this.props.userAction.isLogin()
  }

  handleProfilePopover = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      profilePopover: true,
      popoverAnchorEl: event.currentTarget,
    });
  };

  handleProfilePopoverClose = () => {
    this.setState({
      profilePopover: false,
    });
  };

  handleLogout = (event) => {
    this.props.userAction.logout().then(()=>{
      location.reload();
    })
  }

  render() {
    const {
        title,
        displaySearch,
        displayBack,
        className,
        user,
    } = this.props;

    const rootClass = cn(style['app-bar'], className)
    return (
      <nav>
        <div className={rootClass}>
          <div className={style['left']}>
            {displayBack ?
              <IconButton
                tooltip="Back"
                onClick={()=>browserHistory.goBack()}
              >
                <ArrowBackIcon className={style['back-icon']}></ArrowBackIcon>
              </IconButton>
              : null
            }
            {displayBack ? null: <img className={style['logo']}></img>}
            <h2 className={style['title']}>{title}</h2>
          </div>
          <div className={style['center']}>
            { displaySearch ? <SearchBox></SearchBox> : null }
          </div>
          <div className={style['right']}>
            {
              user._id?
              <span className={style['menu-item']}>
                <Avatar
                  backgroundColor='#F06292'
                  style={{color: 'white'}}
                >
                  {user.username.charAt(0)}
                </Avatar>
                <FlatButton label={user.username} onTouchTap={this.handleProfilePopover} style={{color: 'white'}}/>

                <Popover
                  open={this.state.profilePopover}
                  anchorEl={this.state.popoverAnchorEl}
                  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  onRequestClose={this.handleProfilePopoverClose}
                >
                  <Menu>
                    <MenuItem primaryText="Sign out" onTouchTap={this.handleLogout} />
                  </Menu>
                </Popover>

              </span>
              :
              <Link to="/auth/login" style={{textDecoration: 'none'}}><span className={style['menu-item']}> Sign up / Sign in </span></Link>

            }
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
