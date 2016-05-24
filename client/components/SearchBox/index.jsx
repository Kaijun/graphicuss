import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import {FlatButton, Dialog, TextField } from 'material-ui'
import CourseCard from '../CourseCard'
import SearchIcon from 'material-ui/svg-icons/action/search'

import style from './style.css'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actions as searchCourse} from '../../redux/modules/searchCourse'

const ENTER_KEY = 13;

class SearchBox extends Component {

    static propTypes = {
    };

    state = {
        isFocused: false,
        dialogOpen: false
    };

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
          let courseCode = this._input.value;
          this.props.searchCourseAction.searchCourse(courseCode).then(() => {
            this.handleDialogOpen()
          })
        }
    };


    handleBoxClick = () => {
        this._input.focus();
    };

    handleFocus = () => {
        this.setState({
            isFocused: true
        });
    };

    handleBlur = () => {
        this.setState({
            isFocused: false
        });
    };

    handleDialogOpen = () => {
      this.setState({dialogOpen: true});
    }

    handleDialogClose = () => {
      this.setState({dialogOpen: false});
    }

    renderCourseDialog() {
        let isCourseFound =  this.props.searchCourse._id?true:false
        const dialogTitle = !isCourseFound? "Not Found" : "Course Found"
        const dialogContent = !isCourseFound? "Course Not Found, Please try again!" : (
          <CourseCard course={this.props.searchCourse}></CourseCard>
        )

        return (
          <Dialog
            className={style['dialog']}
            contentClassName={style['dialog-content']}
            bodyClassName={style['dialog-body']}
            title={dialogTitle}
            modal={false}
            onRequestClose={this.handleDialogClose}
            open={this.state.dialogOpen}
          >
            {dialogContent}
          </Dialog>
      )

    }

    render() {
        const { search } = this.props;
        const focusStyle = this.state.isFocused ? style['search-box-focused'] : '';
        const rootClassNames = cx(style['search-box'], focusStyle);

        return (
          <div className={style['search-box-wrapper']} >
            <div
              className={rootClassNames}
              onClick={this.handleBoxClick}
            >
              <SearchIcon className={style['icon']}/>
              <input
                className    = {style['search-box-input']}
                type         = 'text'
                ref          = {ref => this._input = ref}
                placeholder  = {'Search'}
                defaultValue = {search}
                onKeyDown    = {this.handleKeyDown}
                onFocus      = {this.handleFocus}
                onBlur       = {this.handleBlur}
              />
            </div>
            {this.renderCourseDialog()}
          </div>
        );
    }
}


function mapStateToProps (state) {
  return {
    searchCourse: state.searchCourse,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    searchCourseAction: bindActionCreators(searchCourse, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)
