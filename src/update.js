import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class UpdateField extends Component {
  constructor(props) {
    super(props);
    this.state = { update: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    _id : PropTypes.string.isRequired,
    updateAuthor: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired
  }
  
  handleChange(e) {
    this.setState({ update: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ update: '' });
  }

  render() {
    console.log('In update')
    return (
      <div>
        <input type='text' placeholder='New comment' 
                onSubmit={this.handleSubmit} onChange={this.handleChange}/>
      </div>
    );  
  }
}

export default UpdateField;