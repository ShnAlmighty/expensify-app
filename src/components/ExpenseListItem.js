import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => (
    <div>
        <div>
            <Link to={`/edit/${props.id}`}><h3>{props.index}. {props.description}</h3></Link>
            <p>
            {numeral(props.amount).format('0,0.00')}Rs 
            : 
            {moment(props.createdAt).format('MMMM Do, YYYY')}
            </p>
        </div>
    </div>
);

export default ExpenseListItem;