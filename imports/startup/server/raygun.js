import raygun from 'raygun';

var raygunClient = new raygun.Client().init({ apiKey: 'Sah7EBMKsi8rNnTMEmiJjA==' });

var d = require('domain').create();
d.on('error', function(err){
  raygunClient.send(err, {}, function () {
    process.exit();
  });
});
