import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './components/inputForm'

function App() {
  const [count, setCount] = useState(0)
  const [purchases, setPurchases] = useState([])

  const URL = 'http://127.0.0.1:5000/budget';
  

  useEffect(() => {updatePurchases()}, []);

  const updatePurchases = () => {
      fetch(URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => {console.log(data); setPurchases(data)})
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
      .then(response => console.log(response))
      .then(updatePurchases())
      .catch(error => console.log("Error occured: ", error));
  }


  return (
    <>
      <h1>Eventually Budget Planner</h1>
      <InputForm handleDataSubmit={handleDataSubmit}/>
    </>
  )
}

export default App
