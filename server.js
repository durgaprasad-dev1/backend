require('dotenv').config();
var express = require('express');
var cors = require('cors');
var path = require('path');

require('./database/connection');

const authRoutes = require('./routes/auth');
const monitorRoutes = require('./routes/monitor');
const avatarRoutes = require('./routes/avatar');

var app = express();

app.use(express.json());
app.use(
  cors: {
      origin: 'https://notify-friend.netlify.app', // You can restrict this in production
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    }
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(authRoutes);
app.use(monitorRoutes);
app.use(avatarRoutes);

app.listen(3700, () => {
  console.log('vinabaduthunda..........');
});
