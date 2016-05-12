
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'

class StaticCanvas extends Component {
  constructor(props, context) {
    super(props, context)
  }

  componentDidMount () {
    let canvasDom = ReactDOM.findDOMNode(this.refs.canvas)
    var canvas = new fabric.StaticCanvas(canvasDom)
    canvas.loadFromJSON(JSON.parse(this.props.canvasJSON))
    canvas.renderAll()
  }

  render() {
    return (
      <div className="container">
          <canvas id="c" ref="canvas" width="600" height="500"></canvas>
       </div>
    )
  }
}


export default StaticCanvas
