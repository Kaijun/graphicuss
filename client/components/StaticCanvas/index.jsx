
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'

class StaticCanvas extends Component {
  constructor(props, context) {
    super(props, context)
    this.canvas = null;
  }

  componentDidMount () {

    let canvasDom = ReactDOM.findDOMNode(this.refs.canvas)
    this.canvas = new fabric.StaticCanvas(canvasDom)

    let {canvasJSON} = this.props

    this.canvas.clear();
    if(canvasJSON){
      this.canvas.loadFromJSON(JSON.parse(canvasJSON))
    }
    this.canvas.renderAll()
    this.canvas.calcOffset();
  }

  componentDidUpdate () {
    let {canvasJSON} = this.props
    this.canvas.clear();
    if(canvasJSON){
      this.canvas.loadFromJSON(JSON.parse(canvasJSON))
    }
    this.canvas.renderAll()
    this.canvas.calcOffset();


  }

  render() {
    let {className} = this.props
    return (
      <div className={className}>
          <canvas id="c" ref="canvas" width="400" height="350"></canvas>
      </div>
    )
  }
}


export default StaticCanvas
