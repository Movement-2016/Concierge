const db = require ('./db');

function init () {
  console.log( 'app init');
}

function getPlan (req, res) {
  console.log ('getPlan', req.params._id);
  Promise.resolve ().then (() => {
    return db.getPlan (req.params._id);
  }).then (plan => {
    if (plan === null) {
      res.status (404).json ({});
    } else {
      res.status (200).json (plan);
    }
  }).catch (err => {
    console.log (err);
    res.status (500).json ({});
  });
}

function createPlan (req, res) {
  console.log ('createPlan', req.body);
  const plan = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    groups: req.body.groups,
  };
  Promise.resolve ().then (() => {
    return db.insertPlan (plan);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function updatePlan (req, res) {
  console.log ('updatePlan', req.params._id, req.body);
  Promise.resolve ().then (() => {
    return db.updatePlan (req.params._id, req.body);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function getData (req, res) {
  Promise.resolve ().then (() => {
    return db.getData ();
  }).then (data => {
    res.status (200).json (data);
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

exports.init = init;
exports.getPlan = getPlan;
exports.createPlan = createPlan;
exports.updatePlan = updatePlan;
exports.getData = getData;
