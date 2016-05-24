import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import {FlatButton, Paper} from 'material-ui';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import muiThemeable from 'material-ui/styles/muiThemeable';
import style from './style.css'
import {actions as userActions} from '../../redux/modules/user'

class AuthView extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.route)
    this.state = {
      isLoginView: this.props.route.name==='auth.signup'?false:true,
    }
  }

  toView = ()=>{
    this.setState({isLoginView: false})
  }

  render () {
    const { route, userActions } = this.props
    return (
      <div className={style.container} style={{backgroundColor:this.props.muiTheme.palette.primary1Color}}>
        <div className={style['main-section']}>

          <Paper rounded={true} zDepth={3}>
            {
              this.state.isLoginView ?
              (<LoginForm user={this.props.user} userActions={this.props.userActions} />)
              :
              (<RegisterForm user={this.props.user} userActions={this.props.userActions}/>)
            }
          </Paper>

          { this.state.isLoginView ?

            <div className={style['not-reg']}>
              <FlatButton
                label="Do not have an account?"
                secondary= {true}
                labelPosition="before"
                icon={<ArrowForwardIcon />}
                onClick={()=>{this.setState({isLoginView: false})}}
              />
            </div>
            :
            <div className={style['is-reg']}>
              <FlatButton
                label="Back To Login?"
                secondary= {true}
                labelPosition="after"
                icon={<ArrowBackIcon />}
                onClick={()=>{this.setState({isLoginView: true})}}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  }
}
export default muiThemeable()(connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthView))
