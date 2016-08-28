
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import FlipMove from 'react-flip-move';
import WhiteBoard from '../WhiteBoard'
import StaticCanvas from '../StaticCanvas'
import RichTextEditor from '../RichTextEditor'
import EditorComposed from '../EditorComposed'

import { Toggle, Paper, Avatar, TextField, RaisedButton, Card, CardActions, CardHeader, CardMedia, CardTitle, FlatButton, CardText, Divider, Dialog, IconButton } from 'material-ui';

import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

import io from 'socket.io-client';
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
      isLargeCanvasDialogOpen: false,
      dialogCanvasJSON: null,
      quotedAnswer: null,
    }


    var socket = io.connect('http://localhost:3001/ws/questions/');
    socket.on('connect', () => {
      socket.emit('question-to-listen', this.questionId);
    })
    socket.on('answers-changed', (answers) => {
      this.props.answersAction.setAnswers(answers)
    });

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
    this.setState({
      quotedAnswer: answer
    }, () => {
      if(answer.canvas){
        this.refs.editorComposed.setCanvas(answer.canvas)
      }
    })
  }
  upvoteAnswerHandler = (answerId) => {
    this.props.answersAction.upvoteAnswer(answerId)
  }

  downvoteAnswerHandler = (answerId) => {
    this.props.answersAction.downvoteAnswer(answerId)
  }

  postNewAnswerHandler = (e) => {
    // let content = this.refs.newAnswerContent.getValue();
    let content = this.refs.editorComposed.getText();
    let canvas = this.refs.editorComposed.getCanvas();
    let quotedAnswer = this.state.quotedAnswer ? this.state.quotedAnswer._id : null;
    this.props.answersAction.newAnswer(this.questionId, {content, canvas, quotedAnswer}).then(() => {
      this.refs.editorComposed.setText('');
      this.refs.editorComposed.clearCanvas();
      this.setState({
        quotedAnswer: null
      })
    })
  }

  toggleLargeCanvasDialog = (open, json) => {
    this.setState({
      isLargeCanvasDialogOpen: open,
      dialogCanvasJSON: json
    })
  }

  render() {
    if(!this.props.question._id){
      return <div>Loading...</div>
    }
    const question = this.props.question
    const answers = this.props.answers
    return (

      <div className={style['container']} >
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

        <FlipMove>
        {
          answers.map((answer) => (
              <Card style={{marginBottom: 10}} key={answer._id} id={answer._id}>
                { answer.quotedAnswer && answer.quotedAnswer._id ?
                  <div className={style['answer-quote']}>
                    Quoted From: <a href={'#' + answer.quotedAnswer._id}>{ '# ' + (answers.map((answer)=>answer._id).indexOf(answer.quotedAnswer._id)+1) }</a>
                  </div>
                  :
                  null
                }
                <CardText>
                  <div className={style['answer-section']}>

                      {
                        answer.content.length>0 && (
                          <div className={style['answer-content']} dangerouslySetInnerHTML={{__html: answer.content}}></div>
                        )
                      }

                      {
                        answer.canvas.length>0 && (
                          <div
                            className={style[answer.content ? 'answer-canvas-sm' : '']}
                            onClick={this.toggleLargeCanvasDialog.bind(this, true, answer.canvas)}
                          >
                            <StaticCanvas canvasJSON={answer.canvas}/>
                          </div>
                        )
                      }

                  </div>
                </CardText>
                <CardActions>
                  <FlatButton onClick={this.upvoteAnswerHandler.bind(this, answer._id)}  label="Up"  primary={answer.userVote===1} />
                  <FlatButton onClick={this.downvoteAnswerHandler.bind(this, answer._id)} label="Down"  primary={answer.userVote===2}  />
                  <h3 style={{display: 'inline', marginLeft: 10}}>{answer.vote}</h3>
                  <span style={{float: 'right', marginRight: '20px', lineHeight: '36px'}}>{answer.creator.username} - {answer.updatedAt.substr(0,10)}</span>
                  <FlatButton onClick={this.quoteAnswerHandler.bind(this, answer)} label="Quote" primary={true} />
              </CardActions>
              </Card>
            )
          )
        }
        </FlipMove>

        <div>
          {
            this.state.quotedAnswer ?
            <div className={style['answer-quote']}>
              You are quoting: <a href={'#' + this.state.quotedAnswer._id}>{ '# ' + (answers.map((answer)=>answer._id).indexOf(this.state.quotedAnswer._id)+1) }</a>
              <CancelIcon  onClick={()=>{this.setState({quotedAnswer: null}); this.refs.editorComposed.clearCanvas();}} ></CancelIcon>
            </div>
            :
            null
          }
          <div style={{marginTop: '12px'}}>
            <EditorComposed ref="editorComposed"></EditorComposed>
            <RaisedButton label="Submit" secondary={true} onTouchTap={this.postNewAnswerHandler} />
          </div>
        </div>

        <Dialog
          title={null}
          bodyStyle={{maxHeight: 'inherit !important'}}
          contentStyle={{maxWidth: 'inherit'}}
          actions={[
            <RaisedButton label="Confirm" onTouchTap={this.toggleLargeCanvasDialog.bind(this, false, null)} />
          ]}
          modal={false}
          open={this.state.isLargeCanvasDialogOpen}
        >
          <StaticCanvas canvasJSON={this.state.dialogCanvasJSON} ></StaticCanvas>
        </Dialog>
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
