const joi = require('@hapi/joi')
const envs = ['development', 'test', 'production']

// Define config schema
const schema = joi.object().keys({
  port: joi.number().default(3000),
  env: joi.string().valid(...envs).default(envs[0]),
  messageConnectionString: joi.string(),
  messageQueue: joi.string().default('claim')
})

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  messageConnectionString: process.env.MINE_SUPPORT_CLAIM_MESSAGE_CONNECTION_STRING,
  messageQueue: process.env.MINE_SUPPORT_CLAIM_MESSAGE_QUEUE
}

// Validate config
const { error, value } = schema.validate(config)

// Throw if config is invalid
if (error) {
  throw new Error(`The server config is invalid. ${error.message}`)
}

module.exports = value
