import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
//import logo from '../logo.svg';
import reducers from '../reducers';
import RootComponent from '../components/RootComponent';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
            <RootComponent />
        </div>
      </Provider>
    );
  }
}

export default App;
