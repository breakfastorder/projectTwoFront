const store = require('./../store')
const showWords = require('./../templates/words-listing.handlebars')
const onSignUpSuccess = function (data) {
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#auth-message').html(data.user.email + ' signed up successfully')
}

const onSignUpFailure = function (data) {
  $('#auth-message').html('Sign up failed')
}

const onSignInSuccess = function (data) {
  store.user = data.user
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')

  $('#sign-in').hide()
  $('#sign-up').hide()


  $('#change-password').show()
  $('#sign-out').show()
  $('#create-word').show()
  $('#get-words').show()

  $('#auth-message').html(data.user.email + ' signed in successfully')
}

const onSignInFailure = function (data) {
  $('#auth-message').html('Sign in failed')
}

const onSignOutSuccess = function (data) {
  store.user = null
  $('#auth-message').html('User has been signed out')

  $('#change-password').trigger('reset')

  $('#sign-in').show()
  $('#sign-up').show()

  $('#change-password').hide()
  $('#sign-out').hide()
  $('#create-word').hide()
  $('#get-words').hide()
}

const onSignOutFailure = function (data) {
  $('#auth-message').html('Sign out failed')
}

const onChangePasswordSuccess = function (data) {
  $('#auth-message').html('Password was changed')
  $('#change-password').trigger('reset')
}
const onChangePasswordFailure = function (data) {
  $('#auth-message').html('Attempt to change password failed, please try again')
}

const onCreateWordSuccess = function (data) {
  $('#auth-message').html('Word ' + data.word.text + ' was created')
  $('#create-word').trigger('reset')
}

const onCreateWordFailure = function (data) {
  $('#auth-message').html('Word was not created, please try again')
}

const onGetPrintSuccess = function (data) {
  const printWords = showWords({words: data.words})
  $('#content').html(printWords)
  store.wordsList = data.words
}

const onGetPrintFailure = function (data) {

}

const onGetWordsSuccess = function (data) {
  store.wordsList = data.words
}

const onGetWordsFailure = function (data) {

}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onCreateWordSuccess,
  onCreateWordFailure,
  onGetPrintSuccess,
  onGetPrintFailure,
  onGetWordsSuccess,
  onGetWordsFailure
}
