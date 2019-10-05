const joi = require('@hapi/joi')
const ViewModel = require('../models/email')
const sendMessage = require('../services/send-message')

module.exports = [{
  method: 'GET',
  path: '/email',
  handler: (request, h) => {
    return h.view('email', new ViewModel())
  }
}, {
  method: 'POST',
  path: '/email',
  handler: async (request, h) => {
    await sendMessage(request.payload.email)
    return h.redirect('./confirmation')
  },
  options: {
    validate: {
      payload: joi.object().keys({
        email: joi.string().email().required()
      }),
      failAction: (request, h, error) => {
        return h.view('email', new ViewModel(request.payload.email, error)).takeover()
      }
    }
  }
}]
