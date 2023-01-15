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

const port = 3080

app.use
app.post('/', async (req,res)=>{
    const {message, currentModel} = req.body
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message:response.data.choices[0].text
    })
})

app.get('/models', async (req,res)=>{
    const response = await openai.listEngines()
    res.json({
        models: response.data.data
    })
})

app.listen(port, ()=>{
    console.log('App listening to '+port)
})
