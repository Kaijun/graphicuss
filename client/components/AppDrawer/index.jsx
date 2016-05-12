import React, { PropTypes, Component } from 'react'
import { Drawer, MenuItem, Avatar } from 'material-ui'
import { Link } from 'react-router'
import style from './style.css'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'

import {actions as userAction} from '../../redux/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AppDrawer extends Component {

  constructor(props) {
    super(props)
    this.state = {drawerOpen: true};
    this.props.userAction.isLogin()
  }

  componentDidMount(){
    this.onEventListener();
  }

  onEventListener(){
    // Listen to the event if left nav is toggled
    eventEmitter.addListener(EVENT_CONST.toggleDrawer, (isOpen) => {
      this.setState({drawerOpen: isOpen})
    })
  }

  renderProfile(){

  }

  render() {
    const { user } = this.props
    const profileSection = (()=>{
      if(user._id){
        return (
          <div className={style['profile-section']}>
            <Avatar className={style['avatar']}>{user.username.charAt(0)}</Avatar>
            <div className={style['username']}>{user.username}</div>
          </div>
        )
      }
      else{
        return (
          <div>Please Login!</div>
        )
      }
    })();

    const menuSection = (()=>{
      if(user._id){
        return (
          <div>
            <Link to={'/search'} style={{'textDecoration': 'none'}}> <MenuItem>Search</MenuItem> </Link>
            <Link to={'/courses/'} style={{'textDecoration': 'none'}}> <MenuItem>Courses</MenuItem> </Link>
            <MenuItem>Subscribtions</MenuItem>
            <MenuItem>Favorite Questions</MenuItem>
            <MenuItem>Notifications</MenuItem>
          </div>
        )
      }
      else{
        return null
      }
    })()

    return (
      <Drawer open={this.state.drawerOpen} style={{'backgroundColor': '#006064'}}>
        {profileSection}
        {menuSection}
      </Drawer>
    )
  }
}


AppDrawer.propTypes = {
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
)(AppDrawer)
