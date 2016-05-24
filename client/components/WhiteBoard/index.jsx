
import React, { Component, PropTypes } from 'react'
import style from './style.css'

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, IconButton, List, ListItem} from 'material-ui';
import TouchIcon from 'material-ui/svg-icons/action/touch-app';
import EclipseIcon from 'material-ui/svg-icons/image/panorama-fish-eye';
import RectangleIcon from 'material-ui/svg-icons/image/crop-din';
import TriangleIcon from 'material-ui/svg-icons/action/change-history';
import LineIcon from 'material-ui/svg-icons/content/remove';
import DrawIcon from 'material-ui/svg-icons/content/create';
import ArcIcon from 'material-ui/svg-icons/image/brightness-3';
import TextIcon from 'material-ui/svg-icons/editor/text-fields';
import ColorIcon from 'material-ui/svg-icons/editor/text-fields';
import BorderColorIcon from 'material-ui/svg-icons/editor/border-color';
import FillColorIcon from 'material-ui/svg-icons/editor/format-color-fill';
import BrushIcon from 'material-ui/svg-icons/image/brush';

class WhiteBoard extends Component {
  constructor(props, context) {
    super(props, context)
    this.canvas = null;
    this.state = {
      drawingHistory: [],
      selectedHistoryIdx: 0,
    };
  }

  exportCanvas() {
    return JSON.stringify(this.canvas.fabricCanvas)
  }

  loadCanvasWithInit(json) {
    this.loadCanvas(json)
    this.setState({
      drawingHistory: [{
        time: new Date(),
        json: json
      }]
    })
  }

  loadCanvas(json) {
    let canvas = this.canvas.fabricCanvas
    //clear canvas
    canvas.clear();
    //load from localStorage
    canvas.loadFromJSON(json);
    // re-render the canvas
    canvas.renderAll();
    // optional
    canvas.calcOffset();
  }

  clearCanvas() {
    let canvas = this.canvas.fabricCanvas
    //clear canvas
    canvas.clear();
    canvas.renderAll();
  }

  listenChange() {
    let canvas = this.canvas.fabricCanvas;
    this.addDrawingHistory(this.exportCanvas())
    canvas.on('mouse:up', (event) => {
      console.log(event)
      let str = this.exportCanvas();
      if(str === this.state.drawingHistory[0].json){
      }
      else{
        this.addDrawingHistory(str)
      }
    })
  }

  addDrawingHistory(canvasJson) {
    let newHistory = [{
      time: new Date(),
      json: canvasJson
    }].concat(this.state.drawingHistory)
    this.setState({
      drawingHistory: newHistory
    })
  }

  onHistoryClick = (history, idx) => {
    let json = history.json
    this.loadCanvas(json);
    this.setState({
      selectedHistoryIdx: idx
    })
  }

  componentDidMount () {
    let _self = this
    $(function(){
      var c = new DrawingFabric.Canvas('drawingCanvas');
      console.log(c)
      c.addFunctionality(new DrawingFabric.Functionality.keyboardEvents()); // Required by keybaordCommands
      c.addFunctionality(new DrawingFabric.Functionality.keyboardCommands());

      c.addFunctionality(new DrawingFabric.Functionality.tools({
        cursor:    $('.js-tools-cursor'),
        ellipse:   $('.js-tools-ellipse'),
        rectangle: $('.js-tools-rectangle'),
        triangle:  $('.js-tools-triangle'),
        line:      $('.js-tools-line'),
        draw:      $('.js-tools-draw'),
        arc:       $('.js-tools-arc'),
        text:      $('.js-tools-text')
      }));
      c.addFunctionality(new DrawingFabric.Functionality.selectWithCursor());
      c.addFunctionality(new DrawingFabric.Functionality.addDoubleClick());
      c.addFunctionality(new DrawingFabric.Functionality.addText());
      c.addFunctionality(new DrawingFabric.Functionality.drawWithMouse());
      c.addFunctionality(new DrawingFabric.Functionality.drawArcWithMouse());
      c.addFunctionality(new DrawingFabric.Functionality.drawShapeWithMouse());
      c.addFunctionality(new DrawingFabric.Functionality.drawLineWithMouse());
      c.addFunctionality(new DrawingFabric.Functionality.selectedProperties({
        strokeWidth: {
          value:  $('.js-selected-properties-stroke-width-value'),
          parent: $('.js-selected-properties-stroke-width')
        },
        stroke: {
          value:  $('.js-selected-properties-stroke-value'),
          parent: $('.js-selected-properties-stroke')
        },
        fill: {
          value: $ ('.js-selected-properties-fill-value'),
          parent: $('.js-selected-properties-fill')
        },
      }));

      // Customise buttons

      //// Use spectrum colour picker
      $('.js-color').each(function(i,e){
        var $e = $(e);

        // Enable spectrum on each input
        $e.spectrum({
          showAlpha:       true,
          preferredFormat: 'rgb'
        });

        // Ensure if the input changes spectrum is updated
        $e.change(function(){
          var newVal = $e.val();
          if($e.spectrum('get') != newVal){
            $e.spectrum('set',newVal);
          }
        });
      });


      _self.canvas = c;
      _self.listenChange();
    })
  }

  render() {

    let { drawingHistory, selectedHistoryIdx } = this.state

    return (
      <div className={style['container']}>
        <Toolbar>
          <ToolbarGroup className={style['tool-btn-group']} >
            <IconButton className="js-tools-cursor"><TouchIcon /></IconButton>
            <IconButton className="js-tools-ellipse"><EclipseIcon /></IconButton>
            <IconButton className="js-tools-rectangle"><RectangleIcon /></IconButton>
            <IconButton className="js-tools-triangle"><TriangleIcon /></IconButton>
            <IconButton className="js-tools-line"><LineIcon /></IconButton>
            <IconButton className="js-tools-draw"><DrawIcon /></IconButton>
            <IconButton className="js-tools-arc"><ArcIcon /></IconButton>
            <IconButton className="js-tools-text"><TextIcon /></IconButton>
          </ToolbarGroup>
          <ToolbarGroup className={style['modify-tool-group']} >
            <span className="js-selected-properties-stroke-width">
              <BrushIcon></BrushIcon>
              <select className="js-selected-properties-stroke-width-value span1">
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
              </select>
            </span>
            <span className="js-selected-properties-fill">
              <FillColorIcon></FillColorIcon>
              <input type='text' className='js-selected-properties-fill-value js-color'></input>
            </span>
            <span className="js-selected-properties-stroke">
              <BorderColorIcon></BorderColorIcon>
              <input type='text' className='js-selected-properties-stroke-value js-color'></input>
            </span>
          </ToolbarGroup>
        </Toolbar>
        <div className={style['canvas-section']}>
          <canvas id='drawingCanvas' width='750px' height='600px'></canvas>


          <List className={style['process']}>
            {
              drawingHistory.map((history, idx) =>
                <ListItem
                  className={selectedHistoryIdx===idx?style['active']:null}
                  key={idx}
                  primaryText={`${history.time.toLocaleDateString()} - ${history.time.toLocaleTimeString()}`}
                  onTouchTap={this.onHistoryClick.bind(this, history, idx)}
                />
              )
            }
          </List>

        </div>

       </div>
    )
  }
}


export default WhiteBoard
