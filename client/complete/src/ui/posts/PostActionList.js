import React, { Component } from 'react';
import { Link } from 'react-router';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionLaunch from 'material-ui/svg-icons/action/launch';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Radium from 'radium';
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/postActions';

export class PostActionList extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.deletePost(this.props.post._id);
  }

  getStyles() {
    return {
      actions: {
        borderTop: 'solid 1px rgba(200, 215, 225, 0.5)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '44px',
        display: 'flex',
        flexDirection: 'row',
      },
      action: {
        borderLeft: 'solid 1px rgba(200, 215, 225, 0.5)',
        flexGrow: '1',
        textAlign: 'center',
        lineHeight: '44px'
      },
      a: {
        color: '#668eaa',
        padding: '0.8em 0',
        fontSize: '.8em',
        textDecoration: 'none'
      },
      svg: {
        width: '16px',
        height: '16px',
        marginRight: '6px',
        position: 'relative',
        top: '3px'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.actions}>
        <div style={[styles.action, {borderLeft: 'none'}]}>
          <Link to={`/posts/${this.props.post._id}/edit`} style={styles.a}>
            <EditorModeEdit color='#668eaa' style={styles.svg} />
            <span>编辑</span>
          </Link>
        </div>
        <div style={styles.action}>
          <Link to={`/posts/${this.props.post._id}`} style={styles.a}>
            <ActionLaunch color='#668eaa' style={styles.svg} />
            <span>查看</span>
          </Link>
        </div>
        <div style={styles.action} onClick={this.handleClick.bind(this)}>
          <Link to='/dashboard' style={styles.a}>
            <ActionDelete color='#668eaa' style={styles.svg} />
            <span>删除</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(null, { deletePost })(Radium(PostActionList));
