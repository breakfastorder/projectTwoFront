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

const onAuthMenuSwap = function () {
  event.preventDefault()
  if (store.authMenuShow) {
    $('#auth-menu').show()
  } else {
    $('#auth-menu').hide()
  }
  store.authMenuShow = !store.authMenuShow
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
  $('#word-menu').show()
  store.userWon = 0
  api.getWords()
    .then(ui.onStartGameSuccess)
    .catch(ui.onGetWordsFailure)
}

const checkGuess = function (data) {
  event.preventDefault()
  // $('#game-message').html('Only one letter allowed for guessing, please try again')

  const form = event.target
  const formData = getFormFields(form)
  // const wordLength = store.gameWordArray.length
  if (store.gameOver === false) {
    if (formData.guess.length > 1) {
      $('#game-message').html('Guess invalid, only a single letter allowed, please try again')
    } else {
      formData.guess = formData.guess.toLowerCase()
      if (store.gameWordArray.includes(formData.guess) === false && store.incorrectGuessArray.includes(formData.guess) === false && store.correctGuessArray.includes(formData.guess) === false) {
        store.incorrectGuessArray.push(formData.guess)
        // add relevant strike
      } else {
        if (store.correctGuessArray.includes(formData.guess) === false) {
          store.correctGuessArray.push(formData.guess)
        }
        for (let i = 0; i < store.realUnderScoreArray.length; i++) {
          if (store.realUnderScoreArray[i] === formData.guess) {
            store.underScoreArray[i] = formData.guess
          }
        }

        store.gameWordArray = store.gameWordArray.filter(word => word !== formData.guess)
      }
      console.log('word array')
      console.log(store.gameWordArray)
      console.log('correct array')
      console.log(store.correctGuessArray)
      console.log('incorrect array')
      console.log(store.incorrectGuessArray)

      if (store.gameWordArray.length === 0) { // && store.correctGuessArray.length === wordLength
        store.gameOver = true
        store.userWon = 1
      } else if (store.incorrectGuessArray.length === 6) {
        store.gameOver = true
        store.userWon = -1
      }
      $('#letter-board').html(store.underScoreArray)
      $('#guess-form').trigger('reset')
    }
  } else {
    $('#game-message').html('Game is over, please start another game to play again')
  }

  if (store.userWon === 1) {
    $('#game-message').html('YOU WON')
    store.userWon = 0
  } else if (store.userWon === -1) {
    store.userWon = 0
    $('#game-message').html('YOU LOST')
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
  onAuthMenuSwap,
  onCreateWord,
  onGetWords,
  onDeleteWords,
  onPrintWords,
  onUpdateWord,
  onStartGame,
  printStoreList,
  checkGuess
}
