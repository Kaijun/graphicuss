
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, RaisedButton, CardText, Avatar, GridList, GridTile, Dialog, TextField } from 'material-ui'
import RichTextEditor from '../RichTextEditor'
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
    return courses.map(function (course) {
      return (
        <GridTile key={course._id} >
          <Link to={`/courses/${course._id}`}>
            <Card >
              <CardMedia overlay={<CardTitle title={course.name} subtitle={course.desc}/>}>
                <img src="http://lorempixel.com/600/337/nature/"/>
              </CardMedia>
              <CardHeader
                title={course.creator.username}
                subtitle={'Informatik'}
                avatar={<Avatar style={{color: 'red'}}>{course.creator.username.charAt(0)}</Avatar>}/>
            </Card>
          </Link>
        </GridTile>
      )
    })

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

        <h1 style={{display: 'inline-block', margin: '0 24px 24px 0'}}>Courses</h1>
        {this.props.user&&this.props.user.tutor?(<RaisedButton label="New Course" primary={true} onTouchTap={this.handleNewCourseDialogOpen}/>):''}


        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {/*Grid list with all possible overrides*/}
          <GridList
            cols={3}
            padding={24}
            cellHeight={270}
          >
            {courses}
          </GridList>


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
