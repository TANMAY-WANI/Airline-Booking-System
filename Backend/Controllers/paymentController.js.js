import Card from '../Models/cardModel.js'
import Ticket from "../Models/ticketModel.js"
import tempBooking from '../Models/tempBooking.js';
import transactionModel from '../Models/transactionModel.js';
import mongoose from 'mongoose';
import flightModel from '../Models/flightModel.js';



const acceptPayment = async (amount,card_details)=>{
    return true;
}
const paymentController = {
    checkSavedCard: async (req,res)=>{
        const userID = req.user.id;
        const card = await Card.findOne({userID})
        if (!card){
            return res.status(404).json({message:"Card not found"})
        }

        return res.status(200).send(card)
    },

    handlePayment: async (req, res) => {
        const { tempBookingID, cardDetails, flag } = req.body;
        const userID = req.user.id;
    
        const bookingInfo = await tempBooking.findOne({ "_id": tempBookingID });
        if (!bookingInfo) {
            return res.status(404).json({ message: "Booking not found" });
        }



        const flightInfo = await flightModel.findById(bookingInfo.flightID);
    

        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {


            if (flightInfo.noOfSeats[bookingInfo.seatType] < bookingInfo.passenger_details.length){
                return res.status(403).json({message:"Not enough seats left"})
            }


            const paymentStatus = await acceptPayment(bookingInfo.cost, cardDetails);
            

            if (paymentStatus) {
                if (flag) {
                    const { card_number, holder_name, cvv, expiry } = cardDetails;
                    const card = new Card({
                        userID,
                        card_number,
                        holder_name,
                        cvv,
                        expiry
                    });
    
                    await card.save({ session });
                }

                const ticketData = {
                    userID: bookingInfo.userID,
                    seatType: bookingInfo.seatType,
                    passenger_details: bookingInfo.passenger_details,
                    flightID: bookingInfo.flightID,
                    cost: bookingInfo.cost,
                };

                
                const ticket = new Ticket(ticketData);

                const savedTicket = await ticket.save({session});

                const ticketID = savedTicket._id;

    
                const transaction = new transactionModel({
                    userID,
                    ticketID,
                    paymentMethod: "Card",
                    paymentStatus: "Successful",
                    amount: bookingInfo.cost
                });
    
                await transaction.save({ session });
    
                await session.commitTransaction();
                session.endSession();
    
                return res.status(200).send(savedTicket);
            } else {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: "Payment failed" });
            }
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: err.message });
        }
    }
    
}

export default paymentController