
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar'
import ContentSection from '../../components/ContentSection'
import AnswersView from '../../components/AnswersView'
import style from './style.css'

class AnswersPage extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount(){
  }

  render() {
    const { params, question} = this.props
    return (
      <div>
        <nav>
          <div className={style['bg']}>
            <AppBar
              title={ question._id ? question.title : null }
              displaySearch={false}
              displayBack={true}
              className={style['app-bar-with-bg']}
            />
          </div>
        </nav>
        <ContentSection >
          <AnswersView params={params}></AnswersView>
        </ContentSection>
      </div>
    )
  }

}


function mapStateToProps (state) {
  return {
    question: state.question,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersPage)
