import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PostActionList from './PostActionList';
import { settings } from '../../settings';

class PostItem extends Component {
  getStyles() {
    return {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#fff',
        border: '1px solid rgba(200, 215, 225, 0.5)',
        boxShadow: ' 0 1px 2px #e9eff3',
        marginBottom: '24px',
        position: 'relative'
      },
      cover: {
        borderBottom: 'solid 1px rgba(200, 215, 225, 0.5)',
        maxHeight: '300px',
        overflowY: 'hidden',
      },
      image: {
        display: 'block',
        width: '100%'
      },
      content: {
        padding: '16px 24px 12px',
        lineHeight: '1.3em'
      },
      name: {
        color: '#2e4453',
        fontWeight: '600',
        fontSize: '1.2em',
        textDecoration: 'none'
      }
    }
  }

  render() {
    const styles = this.getStyles();
    const { post, isAuthenticated, currentUser } = this.props;
    return (
      <div style={styles.root}>
        <div style={styles.cover}>
          <img src={`${settings.host}/uploads/posts/${post.cover}`} style={styles.image}/>
        </div>
        <div style={styles.content}>
          <Link to={`/posts/${post._id}`} style={styles.name}>
            {post.name}
          </Link>
        </div>
        { isAuthenticated && (currentUser.admin === true) ? <PostActionList post={post} /> : '' }
      </div>
    );
  }
}

PostItem.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  currentUser: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentUser: state.auth.currentUser
})

export default connect((mapStateToProps), null)(Radium(PostItem));
