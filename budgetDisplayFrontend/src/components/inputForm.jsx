import React, {useState} from "react";

const InputForm = (props) => {
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [name, setName] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if(date === "" || name === ""){
            alert("Please fill out all areas");
        }
        else if(amount < 0){
            alert("Only charges greater than zero");
        }
        else{
            props.handleDataSubmit({amount: amount, date: date, name: name});
        }
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
        <div>
            <form>
                <header>Enter Purchase Information</header>
                <label htmlFor="name">Purchase Name: </label>
                <input id="name" className="name" placeholder="Enter Name of Purchase" onChange={updateName} type="text" value={name}></input>
                <label htmlFor="date">Date: </label>
                <input id="date" className="date" onChange={updateDate} type="date" value={date}></input>
                <label htmlFor="price">Cost: </label>
                <input id="price" className="price" onChange={updateAmount} type="number" value={amount}></input>

                <button type="submit" onClick={handleSubmit}>Submit Info</button>
            </form>
        </div>
    )

}

export default InputForm;