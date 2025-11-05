'use client'
import { useEffect, useState } from "react";

type Item = {
    description: string,
    quantity: string,
    price: string,
    total: string
}

type client = {
    _id : string,
    name : string,
    email : string
}

export default function CreateInvoice() {
    const [clientId, setClientId] = useState<string>('')
    const [items, setItems] = useState<Item[]>([{ description: '', quantity: '', price: '', total: '' }])
    const [totalAmount, setTotalAmount] = useState<string>('')
    const [status, setStatus] = useState<string>('Unpaid')
    const [dueDate, setDueDate] = useState<string>('')
    const [notes, setNotes] = useState<string>('')
    const [clients , setClients] = useState<client[]>([])

   useEffect(()=>{
    const getClients = async () =>{
        const res = await fetch('http://localhost:5000/list-client/allClientsList' , {method : 'GET' , credentials : 'include'})
        const data = await res.json();
        setClients(data.allClient)
    }
    getClients();
   } , [])

    const handleInvoice = async (e: any) => {
        e.preventDefault();
        await fetch(`http://localhost:5000/invoice/create-invoice`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ clientId, items, totalAmount, status, dueDate, notes }),
        })
    }

    const addItem = () => {
        setItems([...items, { description: '', quantity: '', price: '', total: '' }])
    }

    const removeItem = (index: number) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    }

    const calculateTotal = (quantity: string, price: string) => {
        const qty = parseFloat(quantity) || 0;
        const prc = parseFloat(price) || 0;
        return (qty * prc).toFixed(2);
    }

    const updateItem = (index: number, field: keyof Item, value: string) => {
        const updated = [...items];
        updated[index][field] = value;
        
        // Auto-calculate total if quantity or price changes
        if (field === 'quantity' || field === 'price') {
            const quantity = field === 'quantity' ? value : updated[index].quantity;
            const price = field === 'price' ? value : updated[index].price;
            updated[index].total = calculateTotal(quantity, price);
        }
        
        setItems(updated);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Invoice</h1>
                    <p className="text-gray-600">Fill in the details below to create a new invoice</p>
                </div>

                <form onSubmit={handleInvoice} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    {/* Client Information */}
                 <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client
                                </label>
                               <select className="text-black" value={clientId} onChange={e=>setClientId(e.target.value)}>
                                <option value="" className="text-black">Select a client</option>
                                    {clients.map((c,i)=>(
                                    <option key={c._id} value={c._id}>
                                        {c.name} - {c.email}
                                    </option>
                                    ))}
                               </select>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Information</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Client ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Client ID"
                                    value={clientId}
                                    onChange={e => setClientId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Invoice Items</h2>
                            <button
                                type="button"
                                onClick={addItem}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-medium text-gray-900">Item {index + 1}</h3>
                                        {items.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="text-red-600 hover:text-red-700 p-1 rounded"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                placeholder="Item description"
                                                value={item.description}
                                                onChange={e => updateItem(index, 'description', e.target.value)}
                                                className="placeholder:text-gray-500 text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={item.quantity}
                                                onChange={e => updateItem(index, 'quantity', e.target.value)}
                                                className="placeholder:text-gray-500 text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                                min="0"
                                                step="1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                value={item.price}
                                                onChange={e => updateItem(index, 'price', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                                            <input
                                                type="text"
                                                value={`$${item.total}`}
                                                readOnly
                                                className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Invoice Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Amount
                                </label>
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    value={totalAmount}
                                    onChange={e => setTotalAmount(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                >
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Paid">Paid</option>
                                   
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 placeholder:text-gray-500 text-black"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes
                        </label>
                        <textarea
                            placeholder="Additional notes or terms..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 resize-none placeholder:text-gray-500 text-black"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 font-medium shadow-md"
                        >
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
           
        </div>
    )
}