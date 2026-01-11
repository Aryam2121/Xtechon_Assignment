import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateTicketPDF = (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const ticketsDir = path.join(__dirname, '..', 'tickets');
      
      // Create tickets directory if it doesn't exist
      if (!fs.existsSync(ticketsDir)) {
        fs.mkdirSync(ticketsDir, { recursive: true });
      }

      const filename = `ticket_${booking.pnr}.pdf`;
      const filepath = path.join(ticketsDir, filename);

      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filepath);

      doc.pipe(stream);

      // Header
      doc.fontSize(28)
         .fillColor('#1e40af')
         .text('✈️ FLIGHT TICKET', { align: 'center' })
         .moveDown(0.5);

      // PNR Box
      doc.fontSize(12)
         .fillColor('#000000')
         .text('PNR:', 50, 120)
         .fontSize(18)
         .fillColor('#dc2626')
         .text(booking.pnr, 100, 115);

      // Line separator
      doc.moveTo(50, 150)
         .lineTo(550, 150)
         .stroke();

      doc.moveDown(2);

      // Passenger Details
      doc.fontSize(14)
         .fillColor('#1e40af')
         .text('Passenger Details', 50, 170)
         .fontSize(11)
         .fillColor('#000000')
         .text(`Name: ${booking.passenger_name}`, 50, 195);

      doc.moveDown(1.5);

      // Flight Details
      doc.fontSize(14)
         .fillColor('#1e40af')
         .text('Flight Information', 50, 230)
         .fontSize(11)
         .fillColor('#000000')
         .text(`Airline: ${booking.airline}`, 50, 255)
         .text(`Flight ID: ${booking.flight_id}`, 50, 275);

      doc.moveDown(1.5);

      // Route Information
      doc.fontSize(14)
         .fillColor('#1e40af')
         .text('Journey Details', 50, 310)
         .fontSize(11)
         .fillColor('#000000')
         .text(`From: ${booking.departure_city}`, 50, 335)
         .text(`Departure Time: ${booking.departure_time}`, 50, 355)
         .moveDown(0.5)
         .text(`To: ${booking.arrival_city}`, 50, 385)
         .text(`Arrival Time: ${booking.arrival_time}`, 50, 405);

      doc.moveDown(1.5);

      // Booking Details
      doc.fontSize(14)
         .fillColor('#1e40af')
         .text('Booking Information', 50, 440)
         .fontSize(11)
         .fillColor('#000000')
         .text(`Booking Date: ${new Date(booking.booking_date).toLocaleString('en-IN', { 
           timeZone: 'Asia/Kolkata',
           dateStyle: 'medium',
           timeStyle: 'short'
         })}`, 50, 465)
         .text(`Amount Paid: ₹${booking.final_price.toFixed(2)}`, 50, 485);

      // Footer Box
      doc.rect(50, 530, 500, 80)
         .fillAndStroke('#f3f4f6', '#d1d5db');

      doc.fontSize(10)
         .fillColor('#374151')
         .text('Important Information:', 60, 545)
         .fontSize(8)
         .text('• Please carry a valid photo ID proof', 60, 565)
         .text('• Report at the airport 2 hours before departure', 60, 580)
         .text('• This is an electronic ticket. No need to print', 60, 595);

      // Bottom border
      doc.moveTo(50, 630)
         .lineTo(550, 630)
         .stroke();

      doc.fontSize(8)
         .fillColor('#6b7280')
         .text('Thank you for booking with us! Have a safe journey.', { align: 'center' }, 640);

      doc.end();

      stream.on('finish', () => {
        resolve(filepath);
      });

      stream.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
};

export { generateTicketPDF };
