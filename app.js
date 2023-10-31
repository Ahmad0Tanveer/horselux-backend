const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();
const allowedOrigins = [
  '*',
  'https://hurseluxprojectupdate-production.up.railway.app'
];
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const routes = require('./Routes/contact');
const user = require('./Routes/user')
const addContact = require('./Routes/contact.route')
const newMed = require('./Routes/newMed')
const serviceRout = require("./Routes/Services")
const filterRoutes = require("./Routes/filtter.route")
const ownerRoutes = require("./Routes/ownergroud.route")
const activityFilters = require("./Routes/activity.filters")
const addnewhorse = require('./Routes/horse.route')
const upload = require('./Routes/upload.route')

const mongoDBUrl = process.env.MONGOURL;

app.use('/', routes)
app.use(user)
app.use("/filters", filterRoutes)
app.use("/groups", ownerRoutes)
app.use("/activities", activityFilters)
app.use("/upload", upload)
app.use(addContact)
app.use(addnewhorse)
app.use(newMed)
app.use(serviceRout)



mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
      console.log('DB Connected!');
    });
  })
  .catch((err) => {
    console.error('DB Connection Error:', err.message);
  });


