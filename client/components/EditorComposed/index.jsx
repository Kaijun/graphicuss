
import React, { Component, PropTypes } from 'react'
import RichTextEditor from '../RichTextEditor'
import WhiteBoard from '../WhiteBoard'
import StaticCanvas from '../StaticCanvas'
import {Dialog, RaisedButton} from 'material-ui';

import style from './style.css'

export default class EditorComposed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      canvasJSON: null,
      editCanvasOpen: false,
    }
  }

  setCanvas(json){
    this.refs.whiteBoard.loadCanvasWithInit(json);
    this.setState({
      canvasJSON: json
    })
  }

  getCanvas(){
    var res = JSON.parse(this.refs.whiteBoard.exportCanvas())
    return res.objects.length===0 ? null : this.refs.whiteBoard.exportCanvas();
  }
  clearCanvas(){
    this.refs.whiteBoard.clearCanvas();
    this.setState({
      canvasJSON: null
    })
  }

  setText(txt){
    this.refs.richTextEditor.setValue(txt)
  }
  getText(){
    return this.refs.richTextEditor.getValue()
  }

  _handleCanvasEditOpen = ()=>{
    this.setState({
      editCanvasOpen: true
    })
  }

  _submitCanvasEdit = () => {
    let json = this.getCanvas()
    console.log(json)
    this.setState({
      editCanvasOpen: false,
      canvasJSON: json,
    })
  }


  render() {
    let {canvasJSON} = this.state
    return (
      <div>

        <div className={style['container']} style={{display: this.state.editCanvasOpen?'none':''}}>
          <RichTextEditor className={style['text-editor']} ref='richTextEditor' />
          <div className={style['small-canvas'] }>
            <div className={style['title']}>Attached Graphic</div>
            <div onClick={this._handleCanvasEditOpen}>
              <StaticCanvas
                canvasJSON={canvasJSON} />
            </div>
            <div className={style['tip']}>(Click to Edit)</div>
          </div>
        </div>


        <div className={style['whiteboard-container']} style={{display: this.state.editCanvasOpen?'':'none'}}>
          <WhiteBoard ref='whiteBoard' />
          <div style={{textAlign: 'center', marginTop: '12px'}}>
            <RaisedButton
              label="Finish Editing"
              secondary={true}
              onTouchTap={this._submitCanvasEdit}
            />
          </div>
        </div>

      </div>
    )
  }
}
