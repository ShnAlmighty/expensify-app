import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render Expense Form corrrectly',()=>{
    const wrapper = shallow(<ExpenseForm/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render Expense Form with expense data',()=>{
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid Form submission',()=>{
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', {
        preventDefault:()=>{  }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change',()=>{
    const value = "New Value";
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('input').at(0).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change',()=>{
    const value = "new Note";
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('textarea').simulate('change',{
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount on valid input',()=>{
    const value = "23.50";
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on invalid input',()=>{
    const value = "23.150";
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('should call onsubmit prop for valid form submission',()=>{
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault:()=>{  }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description:expenses[0].description,
        amount:expenses[0].amount,
        note:expenses[0].note,
        createdAt:expenses[0].createdAt
    });
});

test('should test new date on new date change',()=>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change',()=>{
    const focused =true;
    const wrapper = shallow(<ExpenseForm onSubmit={()=>{}}/>);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused});
    expect(wrapper.state('calenderFocused')).toEqual(true);
});