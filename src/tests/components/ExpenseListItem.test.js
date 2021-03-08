import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem  from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render Expense List Item',()=>{
        const wrapper = shallow(<ExpenseListItem key={expenses[0].id} {...expenses[0]} index={expenses[0].id}/>);
        expect(wrapper).toMatchSnapshot();
});