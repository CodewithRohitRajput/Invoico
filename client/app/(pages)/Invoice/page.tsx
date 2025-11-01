import { useState } from "react";

export default function CreateInvoice(){
    const[clientId , setClientId] = useState<String>('')
    const[items , setItems] = useState<String>('')
    const[totalAmount , setTotalAmount] = useState<String>('')
    const[status , setStatus] = useState<String>('')
    const[dueDate , setDueDate] = useState<String>('')
    const[notes ,setNotes] = useState<String>('')
}