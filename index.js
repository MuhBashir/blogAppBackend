const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const blogRouter = require('./routes/blog-routes');
const { info, error } = require('../blogAppBackend/utils/logger');
const { MONGODB_URI, PORT } = require('../blogAppBackend/utils/config');

app.use(express.json());
app.use('/api/user', router);
app.use('/api/blog', blogRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => {
      info(`Server is listening on port ${PORT}`);
    })
  )
  .then(() => {
    info(`connecting to to the database...`);

    info(`Connected to the database`);
  })
  .catch((err) => error(err));

//86kKhrDchpp05lqg

//mongodb+srv://mbashiribrahim7:<password>@cluster0.20mhc7o.mongodb.net/?retryWrites=true&w=majority

module.exports = { app };
