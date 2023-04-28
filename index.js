

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import pdf from "pdf-creator-node";
import fs from "fs";
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import cloudinary from './cloudinary.js';
import sendEmail from './cloudinary.js';

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
const port = process.env.port



app.get('/', async (req, res) => {
    // Read HTML Template
    var html = fs.readFileSync({ path: path.join(__dirname, './template.html') }, "utf8");
    const bitmap = fs.readFileSync("./logo.png")
    const logo = bitmap.toString('base64');
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };
    var users = [
        {
            name: "Shyam",
            age: "26",
        
        },
        {
            name: "Navjot",
            age: "26",
          
        },
        {
            name: "Vitthal",
            age: "26",
           
        },
    ];
    var document = {
        html: html,
        data: {
            users: users,
            logo: logo
        },
        path: "./output.pdf",
        type: "",
    };
    pdf
        .create(document, options)
        .then(async (res) => {
            const { secure_url, public_id } = await cloudinary.uploader.upload("./output.pdf")
            console.log({ secure_url, public_id });
        })
        .catch((error) => {
            console.error(error);
        });
    res.json({ message: "done" })

})

app.listen(port, () => console.log(`runing in port 3000`))
