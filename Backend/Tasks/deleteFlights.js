import flightModel from "../Models/flightModel.js";

const deleteCompletedFlights = async () => {
    const currentDate = new Date();
  
    try {
      const result = await flightModel.deleteMany({ departure: { $lt: currentDate } });
      console.log(`Deleted ${result.deletedCount} completed flights`);
    } catch (err) {
      console.error('Error deleting completed flights:', err);
    }
  };

export default deleteCompletedFlights