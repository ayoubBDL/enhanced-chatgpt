const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.png') //Appending .png
    }
  })
const upload = multer({storage})

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-dTckV5uaERhz33ZvsRXV0XkD",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())

const port = process.env.PORT || 5000

app.use

app.get('/', async (req,res)=>{
    try {
        
        res.status(200).json({
            Hello: "Ayoub"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
})


app.post('/advencedchat', async (req,res)=>{
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

app.post('/chat', async (req,res)=>{
    const {message} = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
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

app.post('/code', async (req,res)=>{
    const {message} = req.body
    try {
        const response = await openai.createCompletion({
            model: "code-davinci-002",
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
        res.status(500).json({
            message:response.data.choices[0].text
        })
        console.error(error)
        res.status(500).send({error})
    }
})


app.post('/imagevariations', upload.single('image'),async (req,res)=>{
    const {numberImages} = req.body
    try {
        
        const reader = fs.createReadStream(`uploads/${req.file.filename}`)
        const response = await openai.createImageVariation(
            reader,
            parseInt(numberImages),
            "1024x1024"
          );
        res.status(200).json({
            images:response.data.data
        })
        // console.log(response.data)
    } catch (error) {
        res.status(500).json({error})
        if (error.response) {
            res.status(500).json({error})
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
})

app.post('/imageprompt', async (req,res)=>{
    const {message, numberImages} = req.body
    try {
        const response = await openai.createImage({
            prompt: `${message}`,
            n: parseInt(numberImages),
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;
        res.status(200).json({
            message:response.data.data
        })
    } catch (error) {
        if (error.response) {
            res.status(500).json({
                message:error.response.data
            })
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
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
