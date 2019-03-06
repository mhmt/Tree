import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux'
import TreeView from './components/TreeView';
import store from './redux/store';

class App extends Component {
  render() {


    return (
      <Provider store={store}>
          <div className="App" style={{width: '100%', height: '99vh'}}>
            
            <TreeView />
          </div>
      </Provider>
       
      
    );
  }
}

export default App;
