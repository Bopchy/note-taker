import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import style from './styles';


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showField: false, author: '', text: '' }; 
    this.rawMarkup = this.rawMarkup.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleAuthorUpdate = this.handleAuthorUpdate.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }

  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return {__html: rawMarkup};
  }

  handleClick(e) {
    this.setState({ showField : !this.state.showField })   
  }

  handleAuthorUpdate(e) {
    this.setState({ author: e.target.value });
  }

  handleCommentUpdate(e) {
    this.setState({ text: e.target.value });
  }

  updateComment = (e) => {
    e.preventDefault();
    let uniqueId = this.props.uniqueId;
    let newAuthor = (this.state.author) ? this.state.author : null;
    let newText = (this.state.text) ? this.state.text : null; // Empty strings are falsy
    let newComment = { 'author': newAuthor, 'text': newText };
    this.props.handleUpdate(uniqueId, newComment);
    this.setState({ showField : !this.state.showField, author: '', text: '' }) // hide input field once submit is done
  }

  deleteComment = (e) => {
    e.preventDefault();
    let uniqueId = this.props.uniqueId;
    console.log('ID:', this.props.uniqueId) 
    this.props.handleDelete(uniqueId);
    console.log('---Deleted')
  }

  render() {
    // console.log('Propsthis', this.props)
    return(
      <div style={style.comment}>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
        
        <button onClick={this.handleClick}>Update</button>
        { this.state.showField ? 
          <div>
            <input id='author' 
                  type='text' 
                  placeholder='New author' 
                  value={this.state.author} 
                  onChange={this.handleAuthorUpdate}/>
            <input id='comment' 
                  type='text' 
                  placeholder='New comment' 
                  value={this.state.text} 
                  onChange={this.handleCommentUpdate}/>
            <button onClick={this.updateComment}>Update</button>
          </div>
          : null 
        }
          
        <button onClick={this.deleteComment}>Delete</button>
      </div>
    );
  }
}

export default Comment;
