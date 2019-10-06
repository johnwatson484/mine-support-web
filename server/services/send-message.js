const rheaPromise = require('rhea-promise')
const config = require('../config')

module.exports = async function send (email) {
  const connectionOptions = setConnectionOptions(config.messageQueue)
  const connection = new rheaPromise.Connection(connectionOptions)
  const senderOptions = configureSender(config.messageQueue.queue)
  const message = createMessage(email)

  try {
    await connection.open()
    const sender = await connection.createAwaitableSender(senderOptions)
    await sender.send({ body: message })
    await sender.close()
    await connection.close()
    console.log('message sent')
  } catch (err) {
    console.error('unable to send message', err)
  }
}

function createMessage (email) {
  return {
    email
  }
}

function configureSender (address) {
  return {
    name: 'mine-support-web',
    target: {
      address
    },
    sendTimeoutInSeconds: 10,
    onError: (context) => {
      const senderError = context.sender && context.sender.error
      if (senderError) {
        console.error('unable to send message', senderError)
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.error('session error', sessionError)
      }
    }
  }
}

function setConnectionOptions (config) {
  return {
    transport: 'ssl',
    host: config.host,
    hostname: config.hostname,
    username: config.username,
    password: config.password,
    port: config.port,
    reconnect: true
  }
}
