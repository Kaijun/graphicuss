
import React, { Component, PropTypes } from 'react'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'
import {TextField, RaisedButton, Card, CardMedia, CardText} from 'material-ui'
import NavNextIcon from 'material-ui/svg-icons/image/navigate-next'
import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline'
import LockOutlineIcon from 'material-ui/svg-icons/action/lock-outline'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style.css'
import { browserHistory } from 'react-router'

const EMAIL_ERROR_TEXT = 'This username is not valid.'
const PWD_ERROR_TEXT = 'This password is not valid.'

class LoginForm extends Component {

  constructor (props) {
    super(props)

    this.state = {
      emailErrorText: '',
      pwdErrorText: '',
    }
  }

  loginHandler = (e) => {
    let self = this
    // Todo: Validation ...

    let data = {
      email: self.refs.emailTextField.getValue(),
      password: self.refs.pwdTextField.getValue()
    }
    this.props.userActions.login(data).then((action) => {
      if(action.error){
        eventEmitter.emit(EVENT_CONST.toggleSnackbar, "Login Failed! " + action.payload.message)
        return;
      }
      eventEmitter.emit(EVENT_CONST.toggleSnackbar, "Login Successfully!")
      browserHistory.push('/courses')
    }, (e)=>{
      console.log('123')
    })
  };

  render () {
    return (
      <form>
        <Card className={style['custom-card']}>
          <CardText>
            <div className={style['text-field-wrapper']}>
              <div className={style['icon-wrapper']}>
                <MailOutlineIcon className={style['icon']} color={this.props.muiTheme.palette.primary1Color}/>
              </div>
              <TextField
                ref='emailTextField'
                className={style['custom-text-field']}
                fullWidth
                hintText='Email'
                floatingLabelText='Email'
                onChange={(e) => {
                  this.setState({
                    emailErrorText: e.target.value ? '' : EMAIL_ERROR_TEXT
                  })
                }}
                errorText={this.state.emailErrorText} />
            </div>


            <div className={style['text-field-wrapper']}>
              <div className={style['icon-wrapper']}>
                <LockOutlineIcon className={style['icon']} color={this.props.muiTheme.palette.primary1Color}/>
              </div>
              <TextField
                ref='pwdTextField'
                className={style['custom-text-field']}
                fullWidth
                type='password'
                hintText='Password'
                floatingLabelText='Password'
                onChange={(e) => {
                  this.setState({
                    pwdErrorText: e.target.value ? '' : PWD_ERROR_TEXT
                  })
                }}
                errorText={this.state.pwdErrorText} />
            </div>



            <div className={style['button-wrapper']}>
              <RaisedButton
                className={style['custom-button-center']}
                icon={<NavNextIcon />}
                labelPosition="before"
                label='Login'
                onClick={this.loginHandler}
                secondary />
            </div>
          </CardText>
        </Card>
      </form>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
  //todos
  //  pushPath: bindActionCreators(pushPath, dispatch),
  }
}
export default muiThemeable()(connect(
  null
  ,
  mapDispatchToProps
)(LoginForm))
