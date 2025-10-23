'use client'
import { useEffect, useState } from "react";

type Client = {
    _id : string,
    name : string,
    email : string,
    phone : string,
    address : string
}

export default function AllClients (){
const [clients , setClients] = useState<Client[]>([])

    useEffect(()=>{
        const getClients = async () => {
            const res = await fetch(`http://localhost:5000/client/get` , {method : 'GET' , credentials : 'include'});
            const data = await res.json();
           setClients( Array.isArray(data.clients) ?  data.clients : [] )
        //    setClients(  data.clients )
        }
        getClients()
    }, []);

return(
    <div>
        {clients.map((c)=>(
<div key={c._id}> 

            <h1>{c.name}</h1>
        <h1>{c.email}</h1>
        <h1>{c.phone}</h1>
        <h1>{c.address}</h1>
</div>
        ))}
    </div>
)

}