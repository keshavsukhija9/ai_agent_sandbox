const Joi = require('joi');

const validateScrapeRequest = (req, res, next) => {
  const schema = Joi.object({
    url: Joi.string().uri().when('urls', {
      is: Joi.exist(),
      then: Joi.optional(),
      otherwise: Joi.required()
    }),
    urls: Joi.array().items(Joi.string().uri()).max(10),
    selectors: Joi.object().pattern(Joi.string(), Joi.string()),
    waitForSelector: Joi.string(),
    concurrency: Joi.number().min(1).max(5).default(3)
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }
  
  next();
};

module.exports = { validateScrapeRequest };