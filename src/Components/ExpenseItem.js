import React from 'react';
import {MdEdit} from "react-icons/md";
import {MdDelete} from "react-icons/md";


export default function ExpenseItem({expense:{charge, amount,id},handleDelete,handleEdit}) {
  return (
    <>
        <li className="item" key={id}>
          <div className="info" key={id}>
           <span className="expense">{charge} </span> 
           <span className="amount">{amount} </span> 
          </div>
          <button className="edit-btn" aria-label="edit-button"  onClick={() => handleEdit(id)}><MdEdit/>  </button>
          <button className="clear-btn" aria-label="delete-button"  onClick={()=>handleDelete(id)}><MdDelete/> </button>

         
        </li>
        
    </>
  )
}
