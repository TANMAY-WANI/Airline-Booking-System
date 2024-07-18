import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import {Alert} from '@mui/material';

const TicketDetails = ({ ticket, flight }) => {
  const [isDownloadFailed, setDownloadFail] = useState(false)
  const ticketRef = useRef();

  const downloadPDF = () => {
    const input = ticketRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ticket.pdf');
      })
      .catch((err) => {
        setDownloadFail(true)
      });
  };

  return (
    <>
      {
        isDownloadFailed && <Alert severity="error">There was some error while downloading your pdf</Alert>
      }
      <Card className="max-w-3xl mx-auto my-8 shadow-xl rounded-xl bg-white border border-gray-200">
        <CardContent ref={ticketRef}>
          <Box className="p-8">
            <Typography variant="h4" component="div" className="text-center mb-8 font-bold text-blue-700">
              Ticket Details
            </Typography>



            <Typography variant="h5" component="div" className=" text-center font-bold text-gray-700">
              Passenger Information
            </Typography>

            {ticket.passenger_details.map((passenger, index) => (
              <Box key={index} className="mb-8 mt-4 border p-6 rounded-lg shadow-sm">
                <Typography variant="h6" component="div" className="mb-4 font-bold text-gray-600">
                  Passenger {index + 1}
                </Typography>
                <Box className="grid grid-cols-3 gap-4">
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-600">Name</Typography>
                    <Typography variant="body2" className="text-gray-800">{passenger.name}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-600">Contact</Typography>
                    <Typography variant="body2" className="text-gray-800">{passenger.contact}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-600">Age</Typography>
                    <Typography variant="body2" className="text-gray-800">{passenger.age}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-600">Gender</Typography>
                    <Typography variant="body2" className="text-gray-800">{passenger.gender}</Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-600">Seat Type</Typography>
                    <Typography variant="body2" className="text-gray-800">{passenger.seatType}</Typography>
                  </div>
                </Box>
              </Box>
            ))}

            <Typography variant="h5" component="div" className="text-center mb-6 font-bold text-gray-700">
              Flight Information
            </Typography>

            <Box className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <Typography variant="subtitle2" className="font-semibold text-gray-600">From</Typography>
                <Typography variant="body2" className="text-gray-800">{flight.src}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-semibold text-gray-600">To</Typography>
                <Typography variant="body2" className="text-gray-800">{flight.dest}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-semibold text-gray-600">Departure</Typography>
                <Typography variant="body2" className="text-gray-800">{new Date(flight.departure).toLocaleString()}</Typography>
              </div>
              <div>
                <Typography variant="subtitle2" className="font-semibold text-gray-600">Arrival</Typography>
                <Typography variant="body2" className="text-gray-800">{new Date(flight.arrival).toLocaleString()}</Typography>
              </div>
            </Box>

            <Typography variant="h5" component="div" className="text-center mb-6 font-bold text-gray-700">
              Total Cost
            </Typography>

            <Typography variant="h6" component="div" className="text-center text-gray-800 mb-8">
              ₹{ticket.cost}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box className="flex justify-center mt-4">
        <Button onClick={downloadPDF} variant="contained" color="primary">
          Download PDF
        </Button>
      </Box>
    </>
  );
};

export default TicketDetails;
