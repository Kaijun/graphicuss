
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar'
import ContentSection from '../../components/ContentSection'
import QuestionsView from '../../components/QuestionsView'
import style from './style.css'

class QuestionsPage extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount(){
  }

  render() {
    const { params, course} = this.props
    return (
      <div>
        <nav>
          <div className={style['bg']}>
            <AppBar
              title={ course._id ? course.name : null }
              displaySearch={false}
              displayBack={true}
              className={style['app-bar-with-bg']}
            />
          </div>
        </nav>
        <ContentSection >
          <QuestionsView params={params}></QuestionsView>
        </ContentSection>
      </div>
    )
  }

}


function mapStateToProps (state) {
  return {
    course: state.course,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsPage)
