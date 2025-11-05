'use client'
import { useEffect, useState } from "react"

export default function Invoices () {

    interface Client {
    _id: string,
    userId: string,
    name: string,
    email: string,
    phone: string,
    company: string,
    address: string
}

interface Invoice {
    _id: string,
    userId : string,
    clientId : Client, // now it's the full Client object, not just a string
    invoiceNumber : string,
    items : {description : string , quantity : string , price : string , total : string}[],
    totalAmount : number,
    status : string,
    issueDate : string,
    dueDate : string,
    notes : string
}

const[invoices , setInvoices] = useState<Invoice[]>([])

    useEffect(()=>{
        const handleReq = async () => {
            try {
                const res = await fetch(`http://localhost:5000/invoice/get-invoice` , {
                    method : "GET",
                    credentials : "include"
                })
                const data = await res.json();
                setInvoices(Array.isArray(data.allInvoice) ? data.allInvoice : []);
            } catch (err) {
                console.error('Fetch error:', err);
            }
        }
        handleReq()
    }, [])

    const getStatusColor = (status: string) => {
        return status === 'Paid' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800';
    }

return (
    <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Invoices</h1>
                <p className="text-gray-600">Manage and track all your invoices</p>
            </div>

            {/* Invoices Grid */}
            {invoices.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
                    <p className="text-gray-500 mb-4">Get started by creating your first invoice</p>
                    <a href="/add-invoice" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Create Invoice
                    </a>
                </div>
            ) : (
                <div className="grid gap-6">
                    {invoices.map((invoice)=>(
                        <div key={invoice._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
                            <div className="p-6">
                                {/* Header Row */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                            {invoice.invoiceNumber}
                                        </h3>
                                        {/* Access populated client fields */}
                                        <p className="text-sm text-gray-600 font-medium">{invoice.clientId.name}</p>
                                        <p className="text-xs text-gray-500">{invoice.clientId.email}</p>
                                        {invoice.clientId.company && (
                                            <p className="text-xs text-gray-500">{invoice.clientId.company}</p>
                                        )}
                                        {invoice.clientId.phone && (
                                            <p className="text-xs text-gray-500">{invoice.clientId.phone}</p>
                                        )}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </div>

                                {/* Dates & Amount */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Issue Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(invoice.issueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Due Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {new Date(invoice.dueDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                                        <p className="text-lg font-bold text-blue-600">
                                            ${invoice.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Items ({invoice.items.length})</p>
                                    <div className="space-y-2">
                                        {invoice.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{item.description}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-900">${item.total}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Notes */}
                                {invoice.notes && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                                            {invoice.notes}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium">
                                        View Details
                                    </button>
                                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-200 text-sm font-medium">
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
)

}