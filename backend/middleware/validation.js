const { validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return early if payload does not meet requirements
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateInput };
