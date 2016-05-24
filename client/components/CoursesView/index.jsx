
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, FloatingActionButton, CardText, Avatar, GridList, GridTile, Dialog, TextField } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';

import RichTextEditor from '../RichTextEditor'
import CourseCard from '../CourseCard'
import style from './style.css'
import {actions as coursesAction} from '../../redux/modules/courses'

class CoursesView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newCourseDialogOpen: false,
    }
    this.props.coursesAction.getCourses()
  }

  renderCourses(){
    const { courses } = this.props
    return (
      <div className={style['cards-wrapper']}>
        {
          courses.map( (course) =>
            <CourseCard course={course} key={course._id}></CourseCard>
          )
        }
      </div>
    )

  }
  renderAddButton(){
    const offsetRight = (window.innerWidth - 1300)>0 ? (window.innerWidth - 1300)/2+36 : 36 ;
    console.log(this.props.user)
    return (
      <div>
        {
          this.props.user&&this.props.user.tutor ?
            <FloatingActionButton
              className={style['add-btn']}
              style={{bottom: '36px', right: offsetRight+'px'}}
              secondary={true}
              onTouchTap={this.handleNewCourseDialogOpen}
            >
              <ContentAdd />
            </FloatingActionButton>
            :
            null
        }
      </div>
    )
  }

  handleNewCourseDialogClose = () => {
    this.setState({newCourseDialogOpen: false});
  };
  handleNewCourseDialogOpen = () => {
    this.setState({newCourseDialogOpen: true});
  };
  submitCourse = (e)=>{
    let self = this
    // Todo: Validation ...
    let data = {
      name: self.refs.newCourseTitle.getValue(),
      desc: self.refs.newCourseDesc.getValue()
    }
    console.log(data)
    this.props.coursesAction.createCourse(data)
    this.handleNewCourseDialogClose();
  };
  render() {
    const courses  = this.renderCourses();
    const addButton  = this.renderAddButton();

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleNewCourseDialogClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitCourse} />,
    ];

    return (
      <div>
        {addButton}

        {courses}

          <Dialog
            title="New Course"
            actions={actions}
            modal={false}
            open={this.state.newCourseDialogOpen}
            onRequestClose={this.handleNewCourseDialogClose}>
            <TextField
              ref='newCourseTitle'
              hintText="Course Name"
              fullWidth={true}
              floatingLabelText="Course Name" />


            <RichTextEditor
              ref='newCourseDesc' />
          </Dialog>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    courses: state.courses,
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    coursesAction: bindActionCreators(coursesAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesView)
