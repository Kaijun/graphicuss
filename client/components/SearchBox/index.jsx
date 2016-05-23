import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { TextField } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search'

import style from './style.css'

const ENTER_KEY = 13;

export default class SearchBox extends Component {

    static propTypes = {
        search   : PropTypes.string,
        onSearch : PropTypes.func
    };

    static contextTypes = { i18n: PropTypes.object };

    state = {
        isFocused: false
    };

    handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            this.props.onSearch(e.target.value);
        }
    };

    handleSearchChange = (e) => {
        const value = e.target.value;

        if (!value) {
            this.props.onSearch(value);
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
                onChange     = {this.handleSearchChange}
                onKeyDown    = {this.handleKeyDown}
                onFocus      = {this.handleFocus}
                onBlur       = {this.handleBlur}
              />
            </div>
          </div>
        );
    }
}
