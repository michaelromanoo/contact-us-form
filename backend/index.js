import express from "express"
import dotenv from "dotenv";
import process from "process";
import nodemailer from "nodemailer"
import { google } from 'googleapis';

// specify path for env variables
// by default, config will look for a file called .env in the current working directory
dotenv.config({
    path: '../.env.local'
})

// express config
const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

// google oauth2 config
const OAuth2 = google.auth.OAuth2;
console.log('oauth2', OAuth2)

// TODO: use try catch here for error handling?
const createTransporter = async () => {
    // oauth2 setup
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    )

    oauth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN
    })

    // TODO: is there another way to do this?
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if(err) {
                reject("Failed to create access token")
            }
            resolve(token)
        })
    })

    // nodemailer transporter object
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN
        }
    })

    // verify transporter
    transporter.verify((err, success) => {
        err ? console.log(err) : console.log(`Server is ready to take messages ${success}`)
    })

    return transporter
}


// lets try sending an email within the server first
const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    emailTransporter.sendMail(emailOptions, (err) => {
        if (err) {
            console.log('nodemailer error', err);
        } else {
            console.log('email sent successfuly')
        }
    } );
}

// mail options object to send to the transporter
// TODO: this will be sent from the frontend 
sendEmail({
    subject: 'hello from nodejs',
    text: "nodemailer test",
    // to be replaced with email from frontend
    to: '',
    from: process.env.EMAIL
})

app.post('/send', (req, res) => {
    res.send('hello from send route')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})


