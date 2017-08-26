import raygun from 'raygun';
import domain from 'domain';

var raygunClient = new raygun.Client().init({ apiKey: 'Sah7EBMKsi8rNnTMEmiJjA==' });

var d = domain.create();
d.on('error', function(err){
  raygunClient.send(err, {}, function () {
    process.exit();
  });
});
