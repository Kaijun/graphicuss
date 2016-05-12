
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, Avatar, RaisedButton, FlatButton, Dialog, TextField} from 'material-ui';
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


    this.state = {
      table: {
        fixedHeader: false,
        fixedFooter: false,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        displaySelectAll: false,
        adjustForCheckbox: false,
        deselectOnClickaway: false,
        displayRowCheckbox: false,
      },
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

    this.props.questionsAction.newQuestion(this.courseId, data)
    this.toggleNewQuestionDialog();
  };

  render() {
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
    ];

    return (
      <div >
        {this.props.course._id &&
          <span style={{marginRight: 24}}>
            <h1 style={{display: 'inline-block', margin: '0 24px 24px 0'}}>
              Course: {this.props.course.name}
            </h1>
            <span>Tutor: {this.props.course.creator.username} </span>
            <span>Code: {this.props.course.code} </span>
          </span>
        }

        <RaisedButton label="New Question" primary={true} onTouchTap={this.toggleNewQuestionDialog}/>

        <Table
          fixedHeader={this.state.table.fixedHeader}
          fixedFooter={this.state.table.fixedFooter}
          selectable={this.state.table.selectable}
          multiSelectable={this.state.table.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader displaySelectAll={this.state.table.displaySelectAll} adjustForCheckbox={this.state.table.adjustForCheckbox}>
            <TableRow>
              <TableHeaderColumn style={{width: '40%'}} tooltip='The Title'>Title</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}} tooltip='Votes Count'>Votes</TableHeaderColumn>
              <TableHeaderColumn style={{width: '10%'}} tooltip='Answer Count'>Answers</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}} tooltip='The Author'>Author</TableHeaderColumn>
              <TableHeaderColumn style={{width: '20%'}} tooltip='The Date'>Date</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.table.deselectOnClickaway}
            showRowHover={this.state.table.showRowHover}
            stripedRows={this.state.table.stripedRows}
            displayRowCheckbox={this.state.table.displayRowCheckbox}>
            {
              this.props.questions.map((question)=>(
                  <TableRow key={question._id}>
                    <TableRowColumn>
                      <Link style={{cursor: 'pointer'}} to={`/questions/${question._id}`}>
                        {question.title}
                      </Link>
                    </TableRowColumn>
                    <TableRowColumn>{question.vote}</TableRowColumn>
                    <TableRowColumn>{question.answerCount}</TableRowColumn>
                    <TableRowColumn>{question.creator.username}</TableRowColumn>
                    <TableRowColumn>{question.createdAt.substr(0,10)}</TableRowColumn>
                  </TableRow>
              ))
            }
          </TableBody>
        </Table>

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
