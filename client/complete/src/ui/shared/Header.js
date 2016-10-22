import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

class Header extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const styles = {
      header: {
        position: 'fixed',
        zIndex: '100',
        top: 0,
        right: 0,
        left: 0,
        backgroundColor: '#00bcd4',
        borderBottom: '1px solid #0079aa',
        height: '47px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      nav: {
        color: 'white',
        opacity: '.8',
        fontWeight: '600',
        fontSize: '1em',
        textDecoration: 'none',
        paddingLeft: '20px',
        ':hover': {
          cursor: 'pointer',
          textDecoration: 'underline'
        }
      }
    }

    const { isAuthenticated, currentUser } = this.props.auth;

    const LogoutLink = (
      <div>
        <span style={{color: 'rgb(255, 226, 0)', paddingRight: '15px'}}>{ currentUser.name }</span>
        <Link to='/' style={styles.nav} onClick={this.logout.bind(this)}>退出</Link>
      </div>
    );

    const LoginLink = (
      <div>
        <Link to='/signup' style={styles.nav}>注册</Link>
        <Link to='/login' style={styles.nav}>登录</Link>
      </div>
    );

    let HomeLink;
    if(isAuthenticated && currentUser.admin) {
      HomeLink = <Link to='/dashboard' style={styles.nav}><ActionDashboard color='#fff' /></Link>
    } else {
      HomeLink = <Link to='/' style={styles.nav}><ActionHome color='#fff' /></Link>
    }

    return (
      <header style={styles.header}>
        <div>{ HomeLink }</div>
        { isAuthenticated ? LogoutLink : LoginLink }
      </header>
    );
  }
}

Header.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(Radium(Header));
