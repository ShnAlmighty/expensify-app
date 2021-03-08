import moment from 'moment';
import { 
    setEndDate, 
    setStartDate, 
    sortByAmount, 
    sortByDate, 
    setTextFilter 
} from '../../actions/filters';

test('should generate set start date action object',()=>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type:'SET_START_DATE',
        date:moment(0)
    });
});

test('should generate set end date action object',()=>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type:'SET_END_DATE',
        date:moment(0)
    });
});

test('should generate set test filter action object with provided values',()=>{
    const action = setTextFilter('rent');
    expect(action).toEqual({
        type:'FILTER_EXPENSE',
        text:'rent'
    });
});

test('should generate set test filter action object with default values',()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:'FILTER_EXPENSE',
        text:''
    });
});

test('should generate sort by amount action object',()=>{
    const action = sortByAmount();
    expect(action).toEqual({
        type:'SORT_BY_AMOUNT'    
    });
});

test('should generate sort by date action object',()=>{
    const action = sortByDate();
    expect(action).toEqual({
        type:'SORT_BY_DATE'    
    });
});