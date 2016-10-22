import React, {Component, PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Radium, { StyleRoot } from 'radium';
import Header from './shared/Header';

class App extends Component {
  getChildContext() {
    return { muiTheme: getMuiTheme() };
  }

  getStyles() {
    const styles = {
      root: {
        paddingTop: '47px',
        minHeight: 400,
      }
    };
    return styles;
  }

  render() {
    const styles = this.getStyles();

    return (
      <StyleRoot>
        <div style={styles.root}>
          <Header />
          { this.props.children }
        </div>
      </StyleRoot>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Radium(App);
