import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 

import store from './store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const styles = {
  container:{
    backgroundColor: "#D29034",
    height: "1000px"
  },
}

ReactDOM.render(
    <Provider store={store}>
      <div style = {styles.container}>
        <App />
      </div>  
    </Provider>, document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
