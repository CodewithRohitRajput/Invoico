'use client'
import { FormEvent, useState } from "react";

export default function ResetPassword () {
      const[resetToken , setResetToken] = useState<string>('')
      const [newPassword, setNewPassword] = useState<string>('');

      const ResetPassword = async (e : FormEvent) => {
        e.preventDefault();
           const response =   await fetch(`http://localhost:5000/reset/reset-password` , {
            method : 'POST',
            credentials : 'include',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({resetToken , newPassword})
        })
        if(response.ok){
            window.location.href='/profile'
        }
        
      }



      return (
        <div>
            <form onSubmit={ResetPassword}>
                <input type="number" value={resetToken} onChange={e => setResetToken(e.target.value)}></input>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                <button>Reset Password</button>
            </form>
        </div>
      ) 


}