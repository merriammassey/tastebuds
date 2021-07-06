const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/taste-buds', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res=> {
  console.log("successful")
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;