import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Comment from './comment';
import style from './styles';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { showField: false }
  }
  
  static propTypes = {
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
  }
  
  render() {
    console.log(this.props.data)
    // let commentNodes = this.props.data.config.data 
    // Causes error when data is not defined -- data is not definde immedately after adding new comment
    let commentNodes = this.props.data.map(comment => {
      return (
        <div>
          <Comment author={comment.author} 
                   key={comment['_id']}
                   uniqueId={comment['_id']}
                   handleUpdate={this.props.handleUpdate}
                   handleDelete={this.props.handleDelete} >
            {comment.text}
            {comment['_id']}
          </Comment>
        </div>
      );
    })
    return(
      <div style={style.commentList}>
        {commentNodes}
      </div>
    );
  }
}

export default CommentList;
