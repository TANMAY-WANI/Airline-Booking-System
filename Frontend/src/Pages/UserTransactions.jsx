import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import Layout from '../Components/Layout'

const UserTransactions = () => {
    const [transactions, setTransactions] = useState([])
    const [isAbsent, setAbsent] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            let isTokenExpired = false;
            try {
                const tokenParts = token.split('.');
                if (tokenParts.length !== 3) {
                    throw new Error("Invalid token format");
                }
                const payload = JSON.parse(atob(tokenParts[1]));
                const tokenExp = payload.exp * 1000;
                isTokenExpired = Date.now() > tokenExp;
            } catch (error) {
                localStorage.removeItem("token");
                localStorage.removeItem("staff")
                location.reload();
            }
            if (isTokenExpired) {
                localStorage.removeItem('token');
                localStorage.removeItem("staff")
                location.reload();
            }
        }
    }, [])
    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        };
        axios.get("http://65.1.136.63/api/view-transactions", { headers })
            .then((res) => {
                setTransactions(res.data)
            }).catch((err) => {
                setAbsent(true)
            })
    })
    return (
        <>
            <Header />
            <Layout>

                <div className="container mx-auto p-4">
                    {
                        !isAbsent &&
                        <>
                            <h1 className="text-3xl font-bold mb-6">Transaction Details</h1>
                            {transactions.map(transaction => (
                                <div key={transaction._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 mb-4">
                                    <div className="p-6">
                                        <h2 className="text-lg font-semibold mb-2">Transaction ID: {transaction._id}</h2>
                                        <p className="text-sm"><span className="font-semibold">Ticket ID:</span> {transaction.ticketID}</p>
                                        <p className="text-sm"><span className="font-semibold">User ID:</span> {transaction.userID}</p>
                                        <p className="text-sm"><span className="font-semibold">Payment Method:</span> {transaction.paymentMethod}</p>
                                        <p className="text-sm"><span className="font-semibold">Payment Status:</span> {transaction.paymentStatus}</p>
                                        <p className="text-sm"><span className="font-semibold">Amount:</span> ₹{transaction.amount}/-</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                    {
                        isAbsent &&
                        <h1 className="text-3xl font-bold mb-6">No transactions found</h1>
                    }
                </div>


            </Layout>
        </>
    )
}

export default UserTransactions