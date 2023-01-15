const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-dTckV5uaERhz33ZvsRXV0XkD",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

app.use
app.post('/', async (req,res)=>{
    const {message, currentModel} = req.body
    try {
        const response = await openai.createCompletion({
            model: `${currentModel}`,
            prompt: `${message}`,
            max_tokens: 3000,
            temperature: 0,
            frequency_penalty:0.5,
            presence_penalty:0
        });
        res.status(200).json({
            message:response.data.choices[0].text
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
})

app.get('/models', async (req,res)=>{
    try {
        const response = await openai.listEngines()
        res.status(200).json({
            models: response.data.data
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
})

app.listen(port, ()=>{
    console.log('App listening to '+ port)
})
