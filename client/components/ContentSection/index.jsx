
import React, { Component, PropTypes } from 'react'
import Footer from '../Footer'
import style from './style.css'

class ContentSection extends Component {
  constructor(props, context) {
    super(props, context)
  }

  renderFooter() {

  }

  render() {
    const { children } = this.props
    return (
      <section className={style['section']}>
        {children}
      </section>
    )
  }
}

ContentSection.propTypes = {
}

export default ContentSection
