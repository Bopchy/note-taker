import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CommentList from './commentList';
import CommentForm from './commentForm';

import style from './styles';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  static propTypes = {
    url: PropTypes.string.isRequired,
    pollInterval: PropTypes.number.isRequired,
  }

  loadCommentsFromServer() {
    axios.get(this.props.url).then(res => { this.setState({ data: res.data })});
  }
  
  handleCommentSubmit(comment) {
    let comments = this.state.data;
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    axios.post(this.props.url, comment)
      .catch(err => { 
        console.log(err);
        this.setState({ data: comments });
      })
  }

  handleUpdate (id, comment) {
    axios.put(`${this.props.url}/${id}`, comment)
      .then(console.log('Update---------->>>',`${this.props.url}/${id}`))
      .catch(err => { 
        console.log(err);
      })
  }

  handleDelete (id) {
    console.log('id: ', id);
    axios.delete(`${this.props.url}/`+id)
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return(
      <div style={style.commentBox}>
        <h2>Comments:</h2>
        <CommentList data={this.state.data} 
                     handleUpdate={this.handleUpdate} 
                     handleDelete={this.handleDelete} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

export default CommentBox;
