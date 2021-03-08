import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = (props) => (
    <div>
        <div>
            <Link to={`/edit/${props.id}`}><h3>{props.index}. {props.description}</h3></Link>
            <p>{props.amount} : {props.createdAt}</p>
        </div>
    </div>
);

export default ExpenseListItem;