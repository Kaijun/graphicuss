
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

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

  }




  render() {

    return (
      <div className={style['container']}>

        <CourseCardExpandable course={this.props.course} questions={this.props.questions.length}></CourseCardExpandable>

        <Table className={style['question-table']}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '40%'}}>Title</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}}>Votes</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}}>Answers</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}}>Author</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}}>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false}>
            {
              this.props.questions.map((question)=>(
                  <TableRow key={question._id} selectable={false}>
                    <TableRowColumn style={{width: '40%'}}>
                      <Link className={style['question-title']} to={`/questions/${question._id}`}>
                        {question.title}
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn style={{width: '10%'}}>{question.vote}</TableRowColumn>
                    <TableRowColumn style={{width: '10%'}}>{question.answerCounts}</TableRowColumn>
                    <TableRowColumn style={{width: '20%'}}>{question.creator.username}</TableRowColumn>
                    <TableRowColumn style={{width: '20%'}}>{question.createdAt.substr(0,10)}</TableRowColumn>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>


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
