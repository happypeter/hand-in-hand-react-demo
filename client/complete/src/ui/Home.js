import React, { Component } from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PostItem from './posts/PostItem';
import { fetchPosts } from '../redux/actions/postActions';

class Home extends Component {
  componentWillMount() {
    if(this.props.posts.length === 0) {
      this.props.fetchPosts();
    }
  }

  render() {
    const styles = {
      root: {
        maxWidth: '720px',
        margin: '30px auto'
      },
      actions: {
        marginTop: '32px',
        marginBottom: '32px',
        textAlign: 'center'
      }
    }

    const PostList = this.props.posts.map((post, i) => {
      return <PostItem key={i} post={post} />
    });

    return (
      <div style={styles.root}>
        { PostList }
      </div>
    );
  }
}

Home.propTypes = {
  posts: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, {fetchPosts})(Home);
