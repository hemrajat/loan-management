import { createStore } from 'redux';
import { countReducer } from './../Reducer/Reducer.js';

export const store = createStore(countReducer);