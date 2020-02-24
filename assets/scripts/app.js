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
  $('#get-words').hide()
  $('#delete-word').hide()
  $('#print-words').hide()
  $('#start-game').hide()
  $('#guess-form').hide()
  $('#print-storeList').hide()
  $('#update-word').hide()

  $('#auth-button').hide()

  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#change-password').on('submit', events.onChangePassword)
  $('#sign-out').on('submit', events.onSignOut)

  $('#auth-button').on('click', events.onAuthMenuSwap)

  $('#create-word').on('submit', events.onCreateWord)
  $('#print-words').on('submit', events.onPrintWords)
  $('#delete-word').on('submit', events.onDeleteWords)
  $('#update-word').on('submit', events.onUpdateWord)
  $('#print-storeList').on('submit', events.printStoreList)

  $('#start-game').on('submit', events.onStartGame)
  $('#guess-form').on('submit', events.checkGuess)
})
