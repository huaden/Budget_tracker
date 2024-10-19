import React, {useState} from "react";

const MoneyDisplay = (props) => {
    return (
        <h1>Euros Left: {2000 - props.curAmount}€</h1>
    )
}

export default MoneyDisplay;