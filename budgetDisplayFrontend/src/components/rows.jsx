import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'


const Row = (props) => {

    const handleDel = (dataID) => {
        props.handleDel(dataID);
    }

    const handleEdit = (info) => {
        props.handleEdit(info);
    }


    return(
        <tr>
            <td>{props.displayNum}</td>
            <td>{props.purchase.name}</td>
            <td>{props.purchase.date}</td>
            <td>{props.purchase.amount}</td>
            <td><button onClick={() => handleEdit(props.purchase)}>Edit</button></td>
            <td><button onClick={() => handleDel(props.id)}>Delete</button></td>
        </tr>
    )


}

export default Row