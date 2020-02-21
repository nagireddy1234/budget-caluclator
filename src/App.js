import React, { useState, useEffect } from 'react';
import './App.css';
import Alert from "./Components/Alert";
import ExpenseForm from "./Components/ExpenseForm";
import ExpenseList from "./Components/ExpenseList";
import uuid from "uuid/v4";

// const iniitialExpenses = [
//   { id: uuid(), charge: "rent", amount: 800 },
//   { id: uuid(), charge: "car payment", amount: 1000 },
//   { id: uuid(), charge: "credit card", amount: 1200 }
// ]

const iniitialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem("expenses")): []

function App() {

  // ************** expenses, set expense**************
  const [expenses, setExpenses] = useState(iniitialExpenses)
  const [charge, setCharge] = useState("")
  const [amount, setAmount] = useState("")
  const [alert, setAlert] = useState({ show: false })
  //  ************for editing ******************
  const [edit, setEdit] =useState(false)
  const[id,setId] =useState(0)

  // ************UseEffect ***************
  useEffect(()=>{
    localStorage.setItem("expenses", JSON.stringify(expenses))
  },[expenses])
  // **************functionalities **************
  const handleCharge = (e) => {
    setCharge(e.target.value)
    // console.log(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.value)
    // console.log(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if(edit){
        let tempExpenses = expenses.map(item =>{
            return item.id===id?{...item, charge, amount} :item   
        })
        setExpenses(tempExpenses)
        setEdit(false)
      }else{
        const singleExpense = { id: uuid(), charge, amount }
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: `Item added` })
      }
      
      setCharge("");
      setAmount("")
    } else {
      handleAlert({ type: "danger", text: `charge can't be empty value and amount value has to be bigger than zero` })
    }
  }

  // *********** clearing items **************

  const handleClear =()=>{
    setExpenses([])
    handleAlert({ type: "danger", text: "All items cleared" });

  }
  
    const handleDelete =id => {
     let tempExpenses = expenses.filter(item => item.id!==id)
     setExpenses(tempExpenses);
     handleAlert({ type: "danger", text: "item deleted" });
  }
  const handleEdit =(id)=>{
    let expense =expenses.find(item=>item.id===id);
    let {charge, amount}=expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
    // console.log(expense)
    // console.log(`item edited : ${id}`)
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1> Budget Caluclator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} edit={edit}/>
        <ExpenseList expenses={expenses} handleClear={handleClear} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>
        total spending :<span className="total"> ${expenses.reduce((accum, current) => {
          return accum += parseInt(current.amount)
        }, 0)} </span>
      </h1>
    </>

  );
}

export default App;
