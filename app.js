// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const port = process.env.PORT ;

const cors =require('cors');
app.use(cors());
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a mongoose model for your form data
const FormData = mongoose.model('FormData', {
  name: String,
  lastName: String,
  email: String,
  message: String,
  choseTopic:String,
  phoneNumber:Number,
});
console.log(FormData)

app.get("/",async(req,res)=>{
  const data =  await FormData.find({})
  console.log(req.body)
  res.json({success:true, data:data});
})
// Route to handle form submission
app.post('/api/FormData', async (req, res) => {
  const formData = new FormData(req.body);
  // formData.save((err) => {
  //   // if (err) {
  //   //   console.error(err);
  //   //   res.status(500).send('Error saving data to database');
  //   // } else {
  //   //   console.log('Data saved successfully');
  //   //   res.status(200).send('Data saved successfully');
  //   // }
  // });
  let result = await formData.save();
  res.send(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
