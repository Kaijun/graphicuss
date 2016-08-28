
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

    let {canvasJSON, height, width} = this.props

    height = height || 600
    width = width || 750

    this.canvas.clear();
    if(canvasJSON){
      this.canvas.loadFromJSON(JSON.parse(canvasJSON))
    }
    // set size of canvas
    this.canvas.setHeight(height)
    this.canvas.setWidth(width)
    this.canvas.setZoom(height/600)


    this.canvas.calcOffset();
    this.canvas.renderAll()
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
          <canvas id="c" ref="canvas"></canvas>
      </div>
    )
  }
}


export default StaticCanvas
