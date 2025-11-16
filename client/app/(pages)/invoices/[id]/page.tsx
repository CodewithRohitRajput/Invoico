'use client'

import { useParams } from "next/navigation"

export default function singleInvoice () {
    const params = useParams();
    const id = params.id;

    const sendEmail = async () => {
        const res = await fetch(`http://localhost:5000/email/toClient` , {
            method : "POST",
            credentials : "include",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({invoiceId : id})
        })
    }

    return(
        <div onClick={sendEmail}>
            Send
        </div>
    )


}