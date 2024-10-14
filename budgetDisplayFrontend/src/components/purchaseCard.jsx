import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Row from "./rows";

const PurchaseCard = (props) => {

    const handleDel = (dataID) => {
        props.handleDel(dataID);
    }

    const handleEdit = (info) => {
        props.handleEdit(info);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name of Purchase</th>
                    <th>Date Bought</th>
                    <th>Amount</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.purchases.map((purchase, index) => {
                    
                    return (
                    <Row key={purchase.id} handleDel={handleDel} handleEdit={handleEdit} 
                    purchase={purchase} id={purchase.id} displayNum={index + 1}/>)
                })}
            </tbody>
        </Table>


    )


}

export default PurchaseCard