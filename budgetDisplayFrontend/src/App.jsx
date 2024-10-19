import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './components/inputForm'
import PurchaseCard from './components/purchaseCard'
import MoneyDisplay from './components/moneyDisplay'

function App() {
  const [purchases, setPurchases] = useState([])
  const [purValues, setPurValues] = useState(0)

  const URL = 'http://127.0.0.1:5000/budget';
  

  useEffect(() => {updatePurchases(); console.log(purchases)}, []);

  const updatePurchases = () => {
      fetch(URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {console.log(data); setPurchases(data)})
      .catch(error => console.log("Error Occured: ", error));
      fetch(URL + '/money', {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {console.log(data); setPurValues(data.amount)})
      .catch(error => console.log("Error Occured: ", error));
  }

  const handleDataSubmit = (info) => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: info.amount,
        date: info.date,
        name: info.name
      }) })
      .then(response => {
        console.log(response); 
        updatePurchases();
      })
      .catch(error => console.log("Error occured: ", error));
  }




  const handleEdit = (info) => {
    console.log(`Id of thing to be updated ${info.id}`)
    const dataID = info.id;

    const patchURL = URL + "/" + dataID;

    fetch(patchURL, {
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: info.amount,
        date: info.date,
        name: info.name
      })
      }).then(response => {
        console.log(response); 
        updatePurchases();
      }).then(data => updatePurchases())
      .catch(error => console.log("Error Occured: ", error))

  }

  const handleDel = (index) => {
    console.log(`Id of thing to be deleted ${index}`)
    const dataId = index;

    const delURL = URL + "/" + dataId;

    console.log(`Delete Url ${delURL}`);

    fetch(delURL, {
      method: 'DELETE'
    })
    .then(response => {
      console.log(response); 
      updatePurchases();
    })
    .catch(error => console.log("Error occured: ", error));

  }


  return (
    <>
      <MoneyDisplay curAmount={purValues}/>
      <br></br>
      <br></br>
      <InputForm handleDataSubmit={handleDataSubmit}/>
      <br></br>
      <PurchaseCard purchases={purchases}  handleDel={handleDel} handleEdit={handleEdit} />
    </>
  )
}

export default App
