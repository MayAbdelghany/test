

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
    res.json({ message: "aaaaaaaaaaaaaaa" })
})

app.get('/hi', async (req, res) => {
    let newPath = path.join(__dirname, './template.html')

    var html = fs.readFileSync(newPath, "utf8");
    let newPath2 = path.join(__dirname, './logo.png')
    const bitmap = fs.readFileSync(newPath2)
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
            let newPath3 = path.join(__dirname, './output.pdf')
            const { secure_url, public_id } = await cloudinary.uploader.upload(newPath3)

        })
        .catch((error) => {
            console.error(error);
        });
    await res.json({ message: "done", "details": { secure_url, public_id } })

})

app.listen(port, () => console.log(`runing in port 3000`))
