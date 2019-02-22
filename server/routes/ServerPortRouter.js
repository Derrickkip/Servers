const express = require('express');
const app = express();
const ServerPortRouter = express.Router();

const ServerPort = require('../models/ServerPort');

ServerPortRouter.route('/add').post(function (req, res) {
  const serverPort = new ServerPort(req.body)
  serverPort.save()
  .then(serverPort => {
    res.json('Sever added successfully');
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  });
});

ServerPortRouter.route('/').get(function (req, res) {
  ServerPort.find(function (err, serverports){
    if(err) {
      console.log(err)
    } else {
      res.json(serverports);
    }
  });
});

ServerPortRouter.route('/edit/:id').get(function (req, res) {
  const id = req.params.id;
  ServerPort.findById(id, function (err, serverport) {
    res.json(serverport);
  });
});

ServerPortRouter.route('/update/:id').post(function (req, res) {
  ServerPort.findById(req.params.id, function(err, serverport, next) {
    if (!serverport)
      return next(new Error('Could ot load Document'));
    else {
      serverport.name = req.body.name;
      serverport.port = req.body.port;

      serverport.save().then(serverport => {
        res.json('Update Complete');
      })
      .catch(err => {
        res.status(400).send("Unable to update the database");
      });
    }
  });
});

ServerPortRouter.route('/delete/:id').get(function (req, res) {
  ServerPort.findOneAndDelete({_id: req.params.id},
    function(err, serverport) {
      if(err) res.json(err)
      else res.json("Successfully removed");
    });
});

module.exports = ServerPortRouter;