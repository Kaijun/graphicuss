
import React, { Component, PropTypes } from 'react'
import style from './style.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actions as questionsAction} from '../../redux/modules/questions'
import { Toggle, Card, CardHeader, CardText, RaisedButton, Avatar, Dialog, TextField, FlatButton} from 'material-ui';
import FingerPrintIcon from 'material-ui/svg-icons/action/fingerprint';

class CourseCardExpandable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      courseDetailExpand: false,
      newQuestionDialogOpen: false,
    }
  }

  toggleNewQuestionDialog = () => {
    this.setState({newQuestionDialogOpen: !this.state.newQuestionDialogOpen});
  }
  submitQuestion = (e)=>{
    let self = this
    // Todo: Validation ...
    let data = {
      title: self.refs.newQuestionTitle.getValue(),
      content: self.refs.newQuestionContent.getValue()
    }

    this.props.questionsAction.newQuestion(this.props.course._id, data)
    this.toggleNewQuestionDialog();
  };

  onCourseDetailExpand = (expand) => this.setState({courseDetailExpand: expand});
  onCourseDetailExpandToggle = (event,toggle) => this.setState({courseDetailExpand: toggle});

  render() {
    const {course, questions} = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.toggleNewQuestionDialog} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submitQuestion} />,
    ]

    return (
      <div className={style['root']}>
        {course._id ?
          <Card
            expanded={this.state.courseDetailExpand}
            onExpandChange={this.onCourseDetailExpand}
          >
            <CardHeader >
              <div className={style['course-card']}>
                <div className={style['course-avatar']}>
                  <Avatar
                    src="http://lorempixel.com/600/337/nature/"
                    size={128} />
                </div>
                <div  className={style['course-info']}>
                  <div className={style['course-header']}>
                    <span className={style['title']}>{course.name}</span>
                    <span className={style['code']}>
                      <FingerPrintIcon className={style['code-icon']}/>
                      <span>{course.code}</span>
                    </span>
                    <RaisedButton className={style['new-btn']} label="New Question" primary={true} onTouchTap={this.toggleNewQuestionDialog}/>
                  </div>
                  <div className={style['author']}>
                    <span>{course.creator.username}</span>
                    <span>Informatik</span>
                    <span>{course.createdAt.substr(0,10)}</span>
                  </div>
                  <div className={style['section']}>
                    <span>Questions: {questions}</span>
                    <span>
                      <Toggle
                        className={style['toggle-btn']}
                        toggled={this.state.courseDetailExpand}
                        onToggle={this.onCourseDetailExpandToggle}
                        labelPosition="right"
                        label="Course Detail"
                      />
                    </span>

                  </div>
                </div>
              </div>
            </CardHeader>

            <CardText expandable={true}>
              <div className={style['desc']} dangerouslySetInnerHTML={{__html: course.desc}}></div>
            </CardText>
          </Card>
          :
          null
        }


        <Dialog
          title="New Question"
          actions={actions}
          modal={false}
          open={this.state.newQuestionDialogOpen}
          onRequestClose={this.toggleNewQuestionDialog}>
          <TextField
            ref='newQuestionTitle'
            hintText="Title"
            fullWidth={true}
            floatingLabelText="Title" />
          <TextField
            ref='newQuestionContent'
            hintText="Content"
            multiLine={true}
            fullWidth={true}
            floatingLabelText="Content" />
        </Dialog>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    questionsAction: bindActionCreators(questionsAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseCardExpandable)
