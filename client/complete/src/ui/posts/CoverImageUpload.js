import React, { Component } from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Radium from 'radium';

import { settings } from '../../settings';

class CoverImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image ? `${settings.host}/uploads/posts/${this.props.image}` : ''
    };
  }

  handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file.type.match('image.*')) {
      console.log('请上传图片');
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          image: event.target.result,
        });
        this.props.handleImage(file);
      }

      reader.readAsDataURL(file);
    }
  }

  getStyles() {
    return {
      uploadWrapper: {
        marginTop: '20px',
        marginBottom: '30px',
        width: '200px',
        border: '1px solie #ddd',
        height: '126px',
        backgroundColor: '#f8f8f8',
        textAlign: 'center',
        position: 'relative',
        backgroundImage: 'url(' + this.state.image + ')',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      },
      uploadLabel: {
        display: 'flex',
        fontSize: '13px',
        paddingTop: '53px',
        justifyContent: 'center',
        cursor: 'pointer'
      },
      uploadSvg: {
        width: '20px',
        height: '20px'
      },
      uploadText: {
        color: 'black',
        lineHeight: '20px'
      },
      uploadLabelAdd: {
        display: 'none',
        backgroundColor: '#ddd',
        height: '24px',
        position: 'absolute',
        top: '0',
        right: '0',
        ':hover': {
          cursor: 'pointer'
        }
      },
      uploadBtn: {
        position: 'absolute',
        display: 'none',
        width: '0',
        height: '0',
        ':focus': {
          outline: 'none'
        }
      }
    }
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={styles.uploadWrapper}>
        <label style={[styles.uploadLabel, this.state.image ? {display: 'none'} : '']} htmlFor='imageUploadBtn' key='1'>
          <ContentAdd style={styles.uploadSvg} />
          <span style={styles.uploadText}>{this.props.tip}</span>
        </label>
        <label style={[styles.uploadLabelAdd, this.state.image ? {display: 'block'} : '']} htmlFor='imageUploadBtn' key='2'>
          <ContentAdd />
        </label>
        <input type='file' id='imageUploadBtn' onChange={this.handleChange.bind(this)} style={styles.uploadBtn}/>
      </div>
    );
  }
}

export default Radium(CoverImageUpload);
