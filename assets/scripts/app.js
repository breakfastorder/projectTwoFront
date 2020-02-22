'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const events = require('./folder/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-word').hide()
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('submit', events.onSignOut)

  $('#create-word').on('submit', events.onCreateWord)
})
