import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import cartReducer from './components/reducers/cartReducer';
//import todos from './components/reducers/reduce'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import request from 'superagent'

const initState = {
    items: [],
    addedItems:[],
    total: 0

}

//console.log(dataService)

const store = createStore(cartReducer, initState, applyMiddleware(thunk));

store.dispatch((dispatch) => {
    dispatch({type: "FETCHING_DATA"})
    request.get('https://api.myjson.com/bins/qhnfp').end(
        (err, res) => { 
            //console.log(err)       
            if (err) {
                return dispatch({ type: 'FETCH_ERROR', payload: err })
            }
            const data = res.body
            dispatch({ type: 'DATA_RECEIVED', payload:data })
      })
    })

//console.log(cartReducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

