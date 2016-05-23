import React, { PropTypes, Component } from 'react'
import { FlatButton } from 'material-ui'
import { Link } from 'react-router'
import style from './style.css'

import {actions as userAction} from '../../redux/modules/user'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class IndexNavBar extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <nav>
        <div className={style['navbar']}>
          <div className={style['button-groups']}>
            <Link to={'/courses'}><FlatButton className={`${style['button']} ${style['active']}`} label="All Courses" /></Link>
            <Link to={''}><FlatButton className={`${style['button']}`} label="My Courses" /></Link>
            <Link to={''}><FlatButton className={`${style['button']}`} label="My Answers" /></Link>
            <Link to={''}><FlatButton className={`${style['button']}`} label="Favourite Questions" /></Link>
          </div>
        </div>
      </nav>
    )
  }
}


IndexNavBar.propTypes = {
}


function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexNavBar)
