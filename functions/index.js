
import * as functions from 'firebase-functions'
import express from 'express'
import admin from 'firebase-admin'
import cors from 'cors'

admin.initializeApp();

const app = express()

app.use(cors({ origin: true }));

app.get('/postajob', (req,res) => res.status(200).send('Hey there!'))


app.post('/postajob', async (req, res) => {
    const jobPosting = req.body;
    console.log(jobPosting)
    await admin.firestore().collection('pending_postings').add(jobPosting)
    res.status(201).send()
})

export const posting = functions.https.onRequest(app)
