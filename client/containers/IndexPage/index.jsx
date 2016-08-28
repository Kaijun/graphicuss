
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from '../../components/AppBar'
import IndexNavBar from '../../components/IndexNavBar'
import ContentSection from '../../components/ContentSection'
import style from './style.css'

class IndexView extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount(){
  }

  render() {
    const { user, children } = this.props
    return (
      <div>
        <nav>
          <AppBar title="Graphicuss" displaySearch={true} />
          <IndexNavBar />
        </nav>
        <ContentSection >
          {children}
        </ContentSection>
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexView)
