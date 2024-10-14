import React, {useState, useEffect} from "react";
import Table from 'react-bootstrap/Table'


const Row = (props) => {

    const[isEdit, setIsEdit] = useState(false);
    const[name, setName] = useState(props.purchase.name);
    const[date, setDate] = useState(props.purchase.date);
    const[amount, setAmount] = useState(props.purchase.amount);


    const setDefaultVal = () => {
        setName(props.purchase.name);
        setDate(props.purchase.date);
        setAmount(props.purchase.amount);
    }

    const handleDel = (dataID) => {
        props.handleDel(dataID);
    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const saveEdit = () => {
        if(date === "" || name === ""){
            alert("Please fill out all areas");
        }
        else if(amount < 0){
            alert("Only charges greater than zero");
        }
        else{
            console.log(`Name of updated task: ${name}, Updated Date: ${date}, Updated amount: ${amount}`);
            props.handleEdit({amount: amount, date: date, name: name, id: props.id});
            setIsEdit(false);
        }
    }
    
    const cancelEdit = () => {
        setIsEdit(false);
        setDefaultVal();
    }


    const updateAmount = (e) => {
        e.preventDefault();
        setAmount(e.target.value);
    }

    const updateDate = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    }

    const updateName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }



    return(

        <tr>
            <td>{props.displayNum}</td>
            <td>{isEdit ? <input type="text" value={name} onChange={updateName}></input> : props.purchase.name}</td>
            <td>{isEdit ? <input type="date" value={date} onChange={updateDate}></input> : props.purchase.date}</td>
            <td>{isEdit ? <input type="number" value={amount} onChange={updateAmount}></input>: props.purchase.amount}</td>
            <td><button onClick={isEdit ? () => saveEdit() : () => handleEdit(props.purchase)}>{isEdit ? "Confirm" : "Edit"}</button></td>
            <td><button onClick={isEdit ? () => cancelEdit() : () => handleDel(props.id)}>{isEdit ? "Cancel" : "Delete"}</button></td>
        </tr>

    )


}

export default Row