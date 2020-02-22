const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const onSignUp = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}
const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  console.log(data)
  api.changePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onCreateWord = function (event) {
  event.preventDefault()
  const form = event.target
  const data = getFormFields(form)
  const word = {
    'word': {
      'text': data.text,
      'times_used': 0,
      'difficulty': data.difficulty
    }
  }
  api.createWord(word)
    .then(ui.onCreateWordSuccess)
    .catch(ui.onCreateWordFailure)
}

const onGetWords = function () {
  event.preventDefault()
  api.getWords()
    .then(ui.onGetWordsSuccess)
    .catch(ui.onGetWordsFailure)
}

const onPrintWords = function () {
  event.preventDefault()
  api.getWords()
    .then(ui.onGetPrintSuccess)
    .catch(ui.onGetPrintFailure)
}

const onDeleteWords = function (data) {
  event.preventDefault()
  onGetWords()
  let a = null
  if (store.wordsList) {
    a = store.wordsList.find(word => word.includes(data))
  }
  console.log(a)

  // api.deleteWords(a)
  //   .then(ui.onDeleteWordsSuccess)
  //   .catch(ui.onDeleteWordsFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onCreateWord,
  onGetWords,
  onDeleteWords,
  onPrintWords
}
