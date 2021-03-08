import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, editExpense, removeExpense } from './actions/expenses';
import { setEndDate, setTextFilter, setStartDate, sortByAmount, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water Bill', amount:200 }));
store.dispatch(addExpense({ description: 'Gas Bill', amount:400, createdAt:1000 }));
store.dispatch(addExpense({ description: 'Rent', amount:11100 }));

const state = store.getState();

const VisibleExpenses = getVisibleExpenses(state.expenses,state.filters);

console.log(VisibleExpenses);

const jsx = (
   <Provider store={store}>
    <AppRouter/>
   </Provider> 
);

ReactDOM.render(jsx, document.getElementById('app'));