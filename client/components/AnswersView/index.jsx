
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import WhiteBoard from '../WhiteBoard'
import StaticCanvas from '../StaticCanvas'
import RichTextEditor from '../RichTextEditor'

import { Toggle, Paper, Avatar, TextField, RaisedButton, Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, Divider } from 'material-ui';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import style from './style.css'
import {actions as questionAction} from '../../redux/modules/question'
import {actions as answersAction} from '../../redux/modules/answers'

class AnswersView extends React.Component {
  constructor(props) {
    super(props)
    this.questionId = this.props.params.questionId
    this.state = {
      isPaintingMode: true,
    }
  }

  componentDidMount() {
    this.props.questionAction.getQuestion(this.questionId)
    this.props.answersAction.getAnswers(this.questionId)
  }

  upvoteQuestionHandler = (e) => {
    this.props.questionAction.upvoteQuestion(this.questionId)
  }

  downvoteQuestionHandler = (e) => {
    this.props.questionAction.downvoteQuestion(this.questionId)
  }

  quoteAnswerHandler = (answer) => {
    if(answer.canvas.length>0){
      this.refs.whiteBoard.loadCanvas(answer.canvas)
    }
  }
  upvoteAnswerHandler = (answerId) => {
    // this.props.answersAction.upvoteAnswer(answerId)
  }

  downvoteAnswerHandler = (answerId) => {
    // this.props.answersAction.downvoteAnswer(answerId)
  }

  postNewAnswerHandler = (e) => {
    // let content = this.refs.newAnswerContent.getValue();
    let content = '';
    let canvas = this.refs.whiteBoard.exportCanvas();
    this.props.answersAction.newAnswer(this.questionId, {content, canvas}).then(() => {
      this.refs.whiteBoard.clearCanvas()
    })
  }

  onEditModeToggle = (e) => {
    this.setState({
      isPaintingMode: !this.state.isPaintingMode
    })
  }

  render() {
    console.log(this.props.question)
    if(!this.props.question._id){
      return <div>Loading...</div>
    }
    const question = this.props.question
    const answers = this.props.answers
    return (

      <div >
        <Card >
          <CardTitle title={
              <span> {question.title} </span>
          }>
          </CardTitle>
          <CardText>
            {question.content}
          </CardText>
          <CardActions>
            <FlatButton onClick={this.upvoteQuestionHandler} primary={question.userVote===1} label="Up" />
            <FlatButton onClick={this.downvoteQuestionHandler} label="Down" primary={question.userVote===2} />
            <h3 style={{display: 'inline', marginLeft: 10}}>{question.vote}</h3>
            <span style={{float: 'right', marginRight: '20px', lineHeight: '36px'}}>{question.creator.username} - {question.updatedAt.substr(0,10)}</span>
        </CardActions>
        </Card>

        {
          answers.length>0 && (<div>
            <h3>{answers.length} Answers</h3>
            <Divider style={{margin: '20px 0'}} />
          </div>)
        }

        {
          answers.map((answer) => (
              <Card style={{marginBottom: 10}} key={answer._id}>
                <CardText>
                  {answer.content}
                  {
                    answer.canvas.length>0 && (<StaticCanvas canvasJSON={answer.canvas}/>)
                  }
                </CardText>
                <CardActions>
                  <FlatButton onClick={this.upvoteAnswerHandler.bind(this, answer._id)}  label="Up" />
                  <FlatButton onClick={this.downvoteAnswerHandler.bind(this, answer._id)} label="Down" />
                  <h3 style={{display: 'inline', marginLeft: 10}}>{answer.vote}</h3>
                  <span style={{float: 'right', marginRight: '20px', lineHeight: '36px'}}>{answer.creator.username} - {answer.updatedAt.substr(0,10)}</span>
                  <FlatButton onClick={this.quoteAnswerHandler.bind(this, answer)} label="Quote" primary={true} />
              </CardActions>
              </Card>
            )
          )
        }

        <div>
          <h3>Your Answer</h3>
          <Divider style={{margin: '20px 0'}} />
          <Toggle
            label="Painting Mode"
            labelPosition="right"
            defaultToggled = {this.state.isPaintingMode}
            ref="editModeToggle"
            onToggle = {this.onEditModeToggle}
            style={{maxWidth: 250}}
          />
        </div>
        <Card>
          <CardText>
{/*
            <TextField
              ref='newAnswerContent'
              hintText="Write your answer here. "
              multiLine={true}
              style={{width: '100%'}}
              rows={10}
              rowsMax={10}
            />
*/}
          {this.state.isPaintingMode? <WhiteBoard ref="whiteBoard" />:<RichTextEditor />}
          </CardText>
          <CardActions >
            <RaisedButton onClick={this.postNewAnswerHandler}  label="Post" secondary={true} />
          </CardActions>
        </Card>

      </div>

    )
  }
}

function mapStateToProps (state) {
  return {
    question: state.question,
    answers: state.answers,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    questionAction: bindActionCreators(questionAction, dispatch),
    answersAction: bindActionCreators(answersAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersView)
