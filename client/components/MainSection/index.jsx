
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { eventEmitter, EVENT_CONST} from '../../constants/EventEmitter'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../Header'
import ContentSection from '../ContentSection'
import style from './style.css'

class MainSection extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {drawerOpen: true};
  }

  componentDidMount(){
    this.onEventListener();
  }

  onEventListener(){
    // Listen to the event if left nav is toggled
    eventEmitter.addListener(EVENT_CONST.toggleDrawer, (isOpen) => {
      this.setState({drawerOpen: isOpen})
    })
  }

  render() {
    const mainClass = style.main + ' ' + (this.state.drawerOpen?'':style['no-sidebar'])
    const { user, children } = this.props
    return (
      <section className={mainClass}>
        <nav>
          <Header />
        </nav>
        <section className={`${style.content}`}>
          <ContentSection >
            {children}
          </ContentSection>
        </section>
      </section>
    )
  }

}

MainSection.propTypes = {

}

export default MainSection
