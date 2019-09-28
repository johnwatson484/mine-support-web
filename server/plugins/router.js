const routes = [].concat(
  require('../routes/home'),
  require('../routes/email'),
  require('../routes/confirmation'),
  require('../routes/public')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
