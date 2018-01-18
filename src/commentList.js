import React, { Component } from 'react';

import Comment from './comment';
import style from './styles';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={comment.author} key={comment['_id']}>
          {comment.text}
        </Comment>
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