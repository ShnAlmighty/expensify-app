import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../actions/filters.js';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export class ExpenseListFilters extends React.Component{ 
    state = {
        calenderFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calenderFocused) => {
        this.setState(()=>({calenderFocused}));
    }
    onTextChange = (e)=>{
        this.props.setTextFilter(e.target.value)
    };
    onSortChange = (e)=>{
        e.target.value == "date" ? 
        this.props.sortByDate() : 
        this.props.sortByAmount()
    };
    render(){
        return (
        <div>
            <input 
            type="text" 
            value={this.props.filters.text} 
            onChange={this.onTextChange}/>
            <select 
            onChange={this.onSortChange}>
                <option value="date" >Date</option>
                <option value="amount">Amount</option>
            </select>
            <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calenderFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={()=>false}
            />
        </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTextFilter: (text) => dispatch(setTextFilter(text)),
        sortByDate: () => dispatch(sortByDate()),
        sortByAmount: () => dispatch(sortByAmount()),
        setStartDate: (startDate) => dispatch(setStartDate(startDate)),
        setEndDate: (endDate) => dispatch(setEndDate(endDate)) 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);