
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Simditor from 'simditor'
import '!style!css?sourceMap!simditor/styles/simditor.css'


export default class RichEditorExample extends React.Component {
  constructor(props) {
    super(props)
    this.editor = null
  }

  componentDidMount() {
    var textbox = ReactDOM.findDOMNode(this.refs.textarea);
    var editor = new Simditor({
      textarea: $(textbox),
      upload: {
        url: '/api/upload-file',
        params: null,
        fileKey: 'file',
        connectionCount: 3,
        leaveConfirm: 'Uploading is in progress, are you sure to leave this page?'
      }
    })
    this.editor = editor
  }

  getValue() {
    return this.editor.sync()
  }

  setValue(val) {
    return this.editor.setValue(val)
  }

  render() {
    let {className} = this.props
    return (
      <div className={className}>
        <textarea ref='textarea' />
      </div>
    )
  }
}
