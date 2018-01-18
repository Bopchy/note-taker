import React, { Component } from 'react';
import marked from 'marked';

import style from './styles';

class Comment extends Component {
//   constructor(props) {
//     super(props);
//     this.rawMarkup = this.rawMarkup.bind(this);
//   }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return {__html: rawMarkup};
  }

  render() {
    return(
      <div style={style.comment}>
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
}

export default Comment;
