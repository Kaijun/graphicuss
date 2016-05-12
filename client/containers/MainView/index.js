
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import AppDrawer from '../../components/AppDrawer'
import MainSection from '../../components/MainSection'

import style from './style.css'

class MainView extends Component {
  render() {
    // const { todos, user, userActions, children } = this.props
    const { children } = this.props
    return (
      <div>
        <AppDrawer />
        <MainSection>
          {children}
        </MainSection>
      </div>
    )
  }
}

MainView.propTypes = {
}

// function mapStateToProps(state) {
//   return {
//     todos: state.todos,
//     user: state.user
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     userActions: bindActionCreators(userActions, dispatch),
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MainView)

export default MainView
