import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Layout from '../Components/Layout'
import TicketDetails from '../Components/TicketDetails'

const Ticket = () => {

    const location = useLocation()
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null)
    const [flight, setFlight] = useState(null)


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
                return
            }
            if (isTokenExpired) {
                localStorage.removeItem('token');
                localStorage.removeItem("staff")
                location.reload();
                return
            }
        }


        if (location.state && location.state.flight && location.state.ticket) {
            setTicket(location.state.ticket)
            setFlight(location.state.flight)
        } else {
            navigate("/")
            return
        }
    }, [location, navigate]);

    if (!flight || !ticket) {
        return null;
    }
    return (
        <>
            <Header />
            <Layout>
                <TicketDetails ticket={ticket} flight={flight} />
            </Layout>
        </>
    )
}

export default Ticket