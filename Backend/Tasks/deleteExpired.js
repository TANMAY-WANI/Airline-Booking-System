import flightModel from "../Models/flightModel.js";
import ticketModel from "../Models/ticketModel.js";

const deleteExpiry = async () => {
  const currentDate = new Date();
  
  try {
    // Step 1: Delete completed flights
    const deletedFlightsResult = await flightModel.deleteMany({ departure: { $lt: currentDate } });

    // Step 2: Delete tickets associated with the deleted flights
    if (deletedFlightsResult && deletedFlightsResult.deletedCount > 0) {
      const deletedFlightIDs = deletedFlightsResult.deletedIds.map(doc => doc._id);

      const deletedTicketsResult = await ticketModel.deleteMany({ flightID: { $in: deletedFlightIDs } });

      console.log(`Deleted ${deletedFlightsResult.deletedCount} flights and ${deletedTicketsResult.deletedCount} associated tickets.`);
    } else {
      console.log('No completed flights found to delete.');
    }
  } catch (err) {
    console.error('Error deleting completed flights and associated tickets:', err);
  }
};

export default deleteExpiry;
