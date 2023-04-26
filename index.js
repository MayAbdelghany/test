import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { createInvoice } from "./pdf.js";

const app = express()
dotenv.config()
app.use(cors())
const port = process.env.port

const invoice = {
    shipping: {
        name: "John Doe",
        address: "1234 Main Street",
        city: "San Francisco",
        state: "CA",
        country: "US",
        postal_code: 94111
    },
    items: [
        {
            item: "TC 100",
            description: "Toner Cartridge",
            quantity: 2,
            amount: 6000
        },
        {
            item: "USB_EXT",
            description: "USB Cable Extender",
            quantity: 1,
            amount: 2000
        }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
};
app.get('/', (req, res, next) => {
    console.log(port);
    //createInvoice(invoice, "invoice.pdf");
    res.json({ message: "hi" })
})


app.listen(port, () => console.log(`runing in port 3000`))
