import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './styles';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: ''};
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!author || !text) {
      return;
    }
    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });
    console.log(`${this.state.author} said "${this.state.text}"`);
  }

  render() {
    return(
      <form style={style.commentForm} onSubmit={this.handleSubmit}>
        <input 
          id="author"
          type='text' 
          placeholder='Your name goes here' 
          style={style.commentFormAuthor} 
          value={this.state.author} 
          onChange={this.handleAuthorChange} />
        
        <input 
          id="comment"
          type='text' 
          placeholder='Your comment goes here' 
          style={style.commentFormText} 
          value={this.state.text} 
          onChange={this.handleTextChange} />
        
        <input type='submit' style={style.commentFormPost} value='Post' />
      </form>
    );
  }
}

export default CommentForm;
