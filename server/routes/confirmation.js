module.exports = {
  method: 'GET',
  path: '/confirmation',
  options: {
    handler: (request, h) => {
      return h.view('confirmation', { reference: 'MINE123' })
    }
  }
}
