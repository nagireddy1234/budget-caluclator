import React from 'react'
import ExpenseItem from "./ExpenseItem"
import uuid from "uuid/v4";
import {MdDelete} from 'react-icons/md'
export default function ExpenseList({expenses,handleClear,handleEdit, handleDelete}) {
  return (
    <>
    <ul className="list">
      {expenses.map((expense)=>{
        return <ExpenseItem key={uuid()} expense={expense} handleEdit={handleEdit} handleDelete={handleDelete}/>
      })} 
      </ul>
      <div>
       {expenses.length>0 && <button className="btn" onClick={handleClear}> Clear expenses <MdDelete className="md-delete"/> </button>} 
      </div>
    </>
  )
}
