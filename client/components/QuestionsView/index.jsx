
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import FlipMove from 'react-flip-move';
import CourseCardExpandable from '../CourseCardExpandable'
import { Toggle, Card, CardHeader, CardText, Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, Avatar, RaisedButton, FlatButton, Dialog, TextField} from 'material-ui';
import io from 'socket.io-client';



import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style.css'
import {actions as courseAction} from '../../redux/modules/course'
import {actions as questionsAction} from '../../redux/modules/questions'

class QuestionsView extends React.Component {
  constructor(props) {
    super(props)

    this.courseId = this.props.params.courseId
    this.props.courseAction.getCourse(this.courseId)
    this.props.questionsAction.getQuestions(this.courseId)

    var socket = io.connect('http://localhost:3001/ws/courses/');
    socket.on('connect', () => {
      socket.emit('course-to-listen', this.courseId);
    })
    socket.on('questions-changed', (questions) => {
      this.props.questionsAction.setQuestions(questions)
    });

  }




  render() {

    return (
      <div className={style['container']}>

        <CourseCardExpandable course={this.props.course} questions={this.props.questions.length}></CourseCardExpandable>

        <div className={style['question-list']}>
          <div className={style['header']}>
            <div className="row">
              <div className="col-md-6">
                Title
              </div>
              <div className="col-md-1">
                Votes
              </div>
              <div className="col-md-1">
                Answers
              </div>
              <div className="col-md-2">
                Author
              </div>
              <div className="col-md-2">
                Date
              </div>
            </div>
          </div>
          <div className={style['list']}>
            <FlipMove>
            {
              this.props.questions.map((question)=>(
                <div className={style['entry'] + ' row'}  key={question._id}>
                  <div className="col-md-6">
                    <Link className={style['question-title']} to={`/questions/${question._id}`}>
                      {question.title}
                    </Link>
                  </div>
                  <div className="col-md-1">
                    {question.vote}
                  </div>
                  <div className="col-md-1">
                    {question.answerCounts}
                  </div>
                  <div className="col-md-2">
                    {question.creator.username}
                  </div>
                  <div className="col-md-2">
                    {question.createdAt.substr(0,10)}
                  </div>
                </div>
              ))
            }
            </FlipMove>
          </div>
        </div>



      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    course: state.course,
    questions: state.questions
  }
}

function mapDispatchToProps (dispatch) {
  return {
    courseAction: bindActionCreators(courseAction, dispatch),
    questionsAction: bindActionCreators(questionsAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsView)
