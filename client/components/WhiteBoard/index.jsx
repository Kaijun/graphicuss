
import React, { Component, PropTypes } from 'react'
import style from './style.css'

class WhiteBoard extends Component {
  constructor(props, context) {
    super(props, context)
  }

  exportCanvas() {
    return JSON.stringify(this.state.canvas.fabricCanvas)
  }

  loadCanvas(json) {
    let canvas = this.state.canvas.fabricCanvas
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
    let canvas = this.state.canvas.fabricCanvas
    //clear canvas
    canvas.clear();
    canvas.renderAll();
  }

  componentDidMount () {
    let _self = this
    $(function(){
      var c = new DrawingFabric.Canvas('canvas');

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
      c.addFunctionality(new DrawingFabric.Functionality.mouseInfo({
        x:    $('.js-mouse-info-x'),
        y:    $('.js-mouse-info-y')
      }));
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
        fontFamily: {
          value:  $('.js-selected-properties-font-family-value'),
          parent: $('.js-selected-properties-font-family')
        },
        fontSize: {
          value:  $('.js-selected-properties-font-size-value'),
          parent: $('.js-selected-properties-font-size')
        },
        lineHeight: {
          value:  $('.js-selected-properties-line-height-value'),
          parent: $('.js-selected-properties-line-height')
        },
        fontStyle: {
          value:  $('.js-selected-properties-font-style-value'),
          parent: $('.js-selected-properties-font-style')
        },
        fontWeight: {
          value:  $('.js-selected-properties-font-weight-value'),
          parent: $('.js-selected-properties-font-weight')
        }
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

      //// Turn checkboxes into toggle buttons
      $('.js-bootstrap-toggle').each(function(i,e){
        var $e = $(e);

        var $input = $e.find('input');

        // Find input and hide it
        $input.hide();

        // Wrap with boot strap toggle button
        $e.wrap('<button type="button" className="btn" data-toggle="button"></button>');

        // Make button strap toggle button match value of checkbox
        var $button = $e.parents('button');
        if($input.is(':checked')){ $button.button('toggle'); }

        $input.change(function(){
          if( $input.is(':checked') != $button.hasClass('active')){
            $button.button('toggle');
          }
        });

        $button.click(function(){
          $input.prop('checked',$button.hasClass('active'));
        });

      });

      _self.setState({canvas: c})

    })
  }

  render() {
    return (
      <div className="container">
          <div className="btn-group">
            <button className="btn js-tools-cursor"><i className='icon-hand-up'></i></button>
            <button className="btn js-tools-ellipse"><i className='icon-vector_path_circle'></i></button>
            <button className="btn js-tools-rectangle"><i className='icon-vector_path_square'></i></button>
            <button className="btn js-tools-triangle"><i className='icon-vector_path_triangle'></i></button>
            <button className="btn js-tools-line"><i className='icon-vector_path_line'></i></button>
            <button className="btn js-tools-draw"><i className='icon-pencil'></i></button>
            <button className="btn js-tools-arc"><i className='icon-vector_path_curve'></i></button>
            <button className="btn js-tools-text"><i className='icon-text-resize'></i></button>
          </div>
         <div className="row">

           <div className="span7">
             <div className="img-polaroid inline">
               <canvas id='canvas' width='530px' height='500px'></canvas>
             </div>
           </div>

           <div className="span3">
             <div className='mouse-info well'>
               <ul>
                 <dt>X</dt>
                 <dd className='js-mouse-info-x'></dd>
                 <dt>Y</dt>
                 <dd className='js-mouse-info-y'></dd>
               </ul>
             </div>
             <div className='properties well'>
               <dl>
                 <dt className="js-selected-properties-stroke-width">Stroke Width</dt>
                 <dd className="js-selected-properties-stroke-width">
                   <select className="js-selected-properties-stroke-width-value span1">
                     <option value='1'>1</option>
                     <option value='2'>2</option>
                     <option value='3'>3</option>
                     <option value='4'>4</option>
                     <option value='5'>5</option>
                   </select>
                 </dd>

                 <dt className="js-selected-properties-fill">Fill</dt>
                 <dd className="js-selected-properties-fill">
                   <input type='text' className='js-selected-properties-fill-value span1 js-color'></input>
                 </dd>

                 <dt className="js-selected-properties-stroke">Stroke</dt>
                 <dd className="js-selected-properties-stroke">
                   <input type='text' className='js-selected-properties-stroke-value span1 js-color'></input>
                 </dd>

                 <dt className="js-selected-properties-font-family">Font Family</dt>
                 <dd className="js-selected-properties-font-family">
                   <select type="text" className="js-selected-properties-font-family-value span2">
                     <option value='sans-serif'>Sans Serif</option>
                     <option value='serif'>Serif</option>
                     <option value='cursive'>Cursive</option>
                     <option value='fantasy'>Fantasy</option>
                     <option value='monospace'>Monospace</option>
                   </select>
                 </dd>

                 <dt className="js-selected-properties-font-size">Font Size</dt>
                 <dd className="js-selected-properties-font-size">
                   <select type="text" className="js-selected-properties-font-size-value span1">
                     <option value='24'>24</option>
                     <option value='36'>36</option>
                     <option value='48'>48</option>
                     <option value='64'>64</option>
                     <option value='72'>72</option>
                   </select>
                 </dd>

                 <dt className="js-selected-properties-line-height">Line height</dt>
                 <dd className="js-selected-properties-line-height">
                   <select type="text" className="js-selected-properties-line-height-value span1">
                     <option value='0.8'>0.8</option>
                     <option value='0.9'>0.9</option>
                     <option value='1'>1</option>
                     <option value='1.1'>1.1</option>
                     <option value='1.2'>1.2</option>
                     <option value='1.3'>1.3</option>
                   </select>
                 </dd>

                 <dt className="js-selected-properties-font-style">Italic</dt>
                 <dd className="js-selected-properties-font-style">
                   <label className="js-bootstrap-toggle"><input className="btn js-selected-properties-font-style-value" type="checkbox" value="italic"/><i className='icon-italic'></i></label>
                 </dd>

                 <dt className="js-selected-properties-font-weight">Bold</dt>
                 <dd className="js-selected-properties-font-weight">
                   <label className="js-bootstrap-toggle"><input className="btn js-selected-properties-font-weight-value" type="checkbox" value="bold"/><i className='icon-bold'></i></label>
                 </dd>

               </dl>
             </div>
           </div>

         </div>


       </div>
    )
  }
}


export default WhiteBoard
