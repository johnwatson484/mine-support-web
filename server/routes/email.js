const joi = require('@hapi/joi')
const ViewModel = require('../models/email')

module.exports = [{
  method: 'GET',
  path: '/email',
  handler: (request, h) => {
    return h.view('home', new ViewModel())
  }
}, {
  method: 'POST',
  path: '/email',
  handler: (request, h) => {
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
