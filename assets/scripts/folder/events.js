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
  console.log(data)
  data.text = data.text.toLowerCase()
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
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.getWords()
    .then(function (response) {
      const a = response.words.find(word => word.text.includes(formData.text)).id
      api.deleteWords(a)
        .then(ui.onDeleteWordsSuccess)
        .catch(ui.onDeleteWordsFailure)
    })
    .catch($('#auth-message').html('Word cannot be found, please try again'))
}

const onUpdateWord = function (data) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.getWords()
    .then(function (response) {
      const index = response.words.find(word => word.text.includes(formData.oldText)).id
      console.log(index)
      formData.text = formData.text.toLowerCase()
      const word = {
        'word': {
          'text': formData.text,
          'times_used': 0,
          'difficulty': formData.difficulty
        }
      }
      api.updateWord(word, index)
        .then(ui.onUpdateWordSuccess)
        .catch(ui.onUpdateWordFailure)
    })
    .catch($('#auth-message').html('Word cannot be found, please try again'))
}

const onStartGame = function () {
  event.preventDefault()
  api.getWords()
    .then(ui.onStartGameSuccess)
    .catch(ui.onGetWordsFailure)
}

const checkGuess = function (data) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  if (formData.length > 1) {
    console.log('please input a single letter')
  } else {
    formData.guess = formData.guess.toLowerCase()
    if (store.gameWordArray.includes(formData.guess) === false) {
      store.incorrectGuessArray.push(formData.guess)
      // add relevant strike
    } else {
      for (let i = 0; i < store.realUnderScoreArray.length; i++) {
        if (store.realUnderScoreArray[i] === formData.guess) {
          store.underScoreArray[i] = formData.guess

        }
        console.log(store.underScoreArray)
      }
      store.correctGuessArray = store.gameWordArray.filter(word => word === formData.guess)
      store.gameWordArray = store.gameWordArray.filter(word => word !== formData.guess)
    }
    console.log('word array')
    console.log(store.gameWordArray)
    console.log('correct array')
    console.log(store.correctGuessArray)
    console.log('incorrect array')
    console.log(store.incorrectGuessArray)
    $('#letter-board').html(store.underScoreArray)
  }
}

const printStoreList = function () {
  event.preventDefault()
  console.log(store.wordsList)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onCreateWord,
  onGetWords,
  onDeleteWords,
  onPrintWords,
  onUpdateWord,
  onStartGame,
  printStoreList,
  checkGuess
}
