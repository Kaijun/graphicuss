
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, RaisedButton, CardText, Avatar, GridList, GridTile, Dialog, TextField } from 'material-ui'
import style from './style.css'
import {actions as searchCourse} from '../../redux/modules/searchCourse'

import { browserHistory } from 'react-router'

class CoursesView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: false,
    }
  }


  handleOpen = () => {
    this.setState({dialogOpen: true});
  }

  handleClose = () => {
    this.setState({dialogOpen: false});
  }

  handleProceed = () => {
    browserHistory.push(`/courses/${this.props.searchCourse._id}`)
  }
  // handleNewCourseDialogOpen = () => {
  //   this.setState({newCourseDialogOpen: true});
  // };
  submitSearch = (e)=>{
    let courseCode = this.refs.courseCode.getValue()
    this.props.searchCourseAction.searchCourse(courseCode).then(() => {
      this.handleOpen()
    })
  }

  renderCourseDialog() {

      let isCourseFound =  this.props.searchCourse._id?true:false
      const dialogTitle = !isCourseFound? "Not Found" : "Result"
      const dialogContent = !isCourseFound? "Course Not Found, Please try again!" : (
        <Card >
          <CardMedia overlay={<CardTitle title={this.props.searchCourse.name} subtitle={this.props.searchCourse.desc}/>}>
            <img src="http://lorempixel.com/600/337/nature/"/>
          </CardMedia>
          <CardHeader
            title={this.props.searchCourse.creator.username}
            subtitle={'Informatik'}
            avatar={<Avatar style={{color: 'red'}}>{this.props.searchCourse.creator.username.charAt(0)}</Avatar>}/>
        </Card>
      )
      const dialogActions = [
        <FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this.handleClose}
        />,
        <FlatButton
          label="Enter"
          primary={true}
          disabled={!isCourseFound}
          onTouchTap={this.handleProceed}
        />,
      ];

      return (
        <Dialog
          title={dialogTitle}
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
        >
          {dialogContent}
        </Dialog>
    )

  }
  render() {
    return (

      <div>

        <TextField
          ref="courseCode"
          hintText="e.g. EkRRkEKpg"
          floatingLabelText="Course Code"
          style={{width: '512px'}}
        />
      <RaisedButton label="Search" onClick={this.submitSearch} primary={true} style={style} />


      {this.renderCourseDialog()}

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    searchCourse: state.searchCourse,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    searchCourseAction: bindActionCreators(searchCourse, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesView)
