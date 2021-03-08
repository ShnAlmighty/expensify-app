import { createStore, combineReducers } from 'redux';
import {v4 as uuidv4} from 'uuid';

const addExpense = (
    { 
        description = '', 
        note = '', 
        amount = 0, 
        createdAt = 0 
    } = {}
) => ({
    type:'ADD_EXPENSE',
    expense:{
        id:uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE EXPENSE
const removeExpense = ({id})=>({
    type:'REMOVE_EXPENSE',
    id
});

//UPDATE EXPENSES
const editExpense = (id,updates)=>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

//Filter Expenses
const setTextFilter = (text='')=>({
    type:'FILTER_EXPENSE',
    text
});

const sortByAmount = ()=>({
    type:'SORT_BY_AMOUNT'
});

const sortByDate = ()=>({
    type:'SORT_BY_DATE'
});

const setStartDate = (date)=>({
    type:'SET_START_DATE',
    date
});

const setEndDate = (date)=>({
    type:'SET_END_DATE',
    date
});

//expense reducer
const expensesReducesDefaultState = [];
const expensesReducer = (state = expensesReducesDefaultState, action) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};
const filtersReducer = (state=filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'FILTER_EXPENSE':
            return {
                ...state,
                text:action.text
            };
        case 'SORT_BY_AMOUNT':
            return{
                ...state,
                sortBy:'amount'
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy:'date'
            };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate:action.date
            };
        case 'SET_END_DATE':
            return{
                ...state,
                endDate:action.date
            };
        default:
            return state;
    }
};

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate })=>{
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !=='number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    });
};

const store = createStore(
    combineReducers({
        expenses:expensesReducer,
        filters:filtersReducer
    })
);

store.subscribe(()=>{
    const state = store.getState();
    const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(VisibleExpenses);
})

const expenseOne = store.dispatch(addExpense({description:'Rent', amount:30000, createdAt:-29999}));
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount:20000, createdAt:-1000}));

// store.dispatch(removeExpense({id:expenseThree.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount:30}));

// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());

const demoState = {
    expenses:[{
        id:'adsaddas',
        description:'January Rent',
        note:'This was the final payment for that address',
        amount: 10000,// or 54500 penies
        createdAt: 0
    }],
    filters:{
        text:'rent',
        sortBy:'amount', //date or amount
        startDate:undefined,
        endDate:undefined
    }
};