import React, { Component, PropTypes } from 'react'
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'
import {TextField, RaisedButton, Card, CardMedia, CardText} from 'material-ui'
import muiThemeable from 'material-ui/styles/muiThemeable'
import DoneIcon from 'material-ui/svg-icons/action/done'
import MailOutlineIcon from 'material-ui/svg-icons/communication/mail-outline'
import PersonalOutlineIcon from 'material-ui/svg-icons/social/person-outline'
import LockOutlineIcon from 'material-ui/svg-icons/action/lock-outline'
import RepeatlineIcon from 'material-ui/svg-icons/AV/repeat'
//todos
//import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style.css'
import { browserHistory } from 'react-router'

const USERNAME_ERROR_TEXT = 'This username is not valid.'
const EMAIL_ERROR_TEXT = 'This email is not valid.'
const PWD_ERROR_TEXT = 'This password is not valid.'
const PWD_REPEAT_ERROR_TEXT = 'These passwords don\'t match. Try again?'

class RegisterForm extends Component {

  constructor (props, context) {
    super(props)
    this.state = {
      usernameErrorText: '',
      emailErrorText: '',
      pwdErrorText: '',
      pwdRepeatErrorText: ''
    }
  }

  signUpHandler = (e) => {
    let self = this
    // Todo: Validation ...

    let data = {
      username: self.refs.usernameTextField.getValue(),
      email: self.refs.emailTextField.getValue(),
      password: self.refs.pwdTextField.getValue()
    }

    this.props.userActions.signUp(data).then(() => {
      if(action.error){
        eventEmitter.emit(EVENT_CONST.toggleSnackbar, "Signup Failed! " + action.payload.message)
        return;
      }
      eventEmitter.emit(EVENT_CONST.toggleSnackbar, "Signup Successfully!")
      browserHistory.push('/courses')
    })
    //todos
    //this.props.pushPath('/courses')
  };

  isloginHandler = (e) => {
    this.props.userActions.isLogin()
  };

  render () {
    return (
      <form>
        <Card className={style['custom-card']}>
          <CardText>

            <div className={style['text-field-wrapper']}>
              <div className={style['icon-wrapper']}>
                <PersonalOutlineIcon className={style['icon']} color={this.props.muiTheme.palette.primary1Color}/>
              </div>
              <TextField
                ref='usernameTextField'
                className={style['custom-text-field']}
                fullWidth
                hintText='User Name'
                floatingLabelText='User Name'
                onChange={(e) => {
                  this.setState({
                    usernameErrorText: e.target.value ? '' : USERNAME_ERROR_TEXT
                  })
                }}
                errorText={this.state.usernameErrorText} />
            </div>

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

            <div className={style['text-field-wrapper']}>
              <div className={style['icon-wrapper']}>
                <RepeatlineIcon className={style['icon']} color={this.props.muiTheme.palette.primary1Color}/>
              </div>
              <TextField
                ref='pwdRepeatTextField'
                className={style['custom-text-field']}
                fullWidth
                type='password'
                hintText='Repeat password'
                floatingLabelText='Repeat Password'
                onChange={(e) => {
                  this.setState({
                    pwdRepeatErrorText: e.target.value ? '' : PWD_REPEAT_ERROR_TEXT
                  })
                }}
                errorText={this.state.pwdRepeatErrorText} />
            </div>

            <div className={style['button-wrapper']}>
              <RaisedButton
                className={style['custom-button-center']}
                label='Sign Up!'
                icon={<DoneIcon />}
                labelPosition="before"
                onClick={this.signUpHandler}
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
)(RegisterForm))
