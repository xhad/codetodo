const express = require('express');
const app = express();

var port = Number(process.env.PORT || 9876);

var apiRouter = require("./api/v1.js");
app.use('/api/v1', apiRouter);

app.listen(port, function() {
  console.log('Api Server listening on port ' + port);
});
