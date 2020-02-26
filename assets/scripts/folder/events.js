const getFormFields = require('./../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

const addHandlers = () => {
  $('#content').on('click', onDeleteHandleWords)
  $('#content').on('submit', onUpdateHandleWords)
}

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
  // console.log(data)
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
  // console.log(data)
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
    .then(onPrintWordsUpdate)
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
  // // console.log(store.user.token)
  api.getWords()
    .then(ui.onGetPrintSuccess)
    .catch(ui.onGetPrintFailure)
}

const onPrintWordsUpdate = function () {
  // event.preventDefault()
  // // console.log(store.user.token)
  api.getWords()
    .then(ui.onGetPrintSuccess)
    .catch(ui.onGetPrintFailure)
}

const onDeletePrintWords = function () {
  event.preventDefault()
  $('#content').html('')
  $('#hide-words').hide()
  $('#print-words').show()
}

const onDeleteWords = function (data) {
  event.preventDefault()
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  // console.log('form data below')
  // console.log(formData)
  formData.text = formData.text.toLowerCase()
  api.getWords()
    .then(function (response) {
      const a = response.words.find(word => word.text.includes(formData.text)).id
      api.deleteWords(a)
        .then(ui.onDeleteWordsSuccess)
        .then(onPrintWordsUpdate)
        .catch(ui.onDeleteWordsFailure)
    })
  $('#delete-word').trigger('reset')
  onPrintWords()
}

const onDeleteHandleWords = function () {
  if (event.target.getAttribute('class') === 'btn btn-danger') {
    api.deleteWords(event.target.getAttribute('word-id'))
      .then(onPrintWordsUpdate)
      .catch(ui.onDeleteWordsFailure)
  }
}

const onUpdateWord = function (data) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  formData.oldText = formData.oldText.toLowerCase()
  // console.log(formData)
  api.getWords()
    .then(function (response) {
      const index = response.words.find(word => word.text.includes(formData.oldText)).id
      // console.log(index)
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
  $('#update-word').trigger('reset')
}

const onUpdateHandleWords = function (data) {
  event.preventDefault()
  if (event.target.getAttribute('class') === 'handle-form') {
    const form = event.target
    const formData = getFormFields(form)
    const word = {
      'word': {
        'text': formData.text,
        'times_used': 0,
        'difficulty': formData.difficulty
      }
    }
    const num = event.target.getAttribute('update-word')
    // console.log(num + ' num')
    api.updateWord(word, num)
      .then(ui.onUpdateWordSuccess)
      .then(onPrintWordsUpdate)
      .catch(ui.onUpdateWordFailure)
    $('#update-word').trigger('reset')
  }
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
        const string = 'Incorrect guesses:('
        $('#incorrect-guesses').text(string + store.incorrectGuessArray.length + '/6)')
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
      // console.log('word array')
      // console.log(store.gameWordArray)
      // console.log('correct array')
      // console.log(store.correctGuessArray)
      // console.log('incorrect array')
      // console.log(store.incorrectGuessArray)

      $('#incorrect-guesses').show()
      $('#incorrect-board').html(store.incorrectGuessArray)
      if (store.gameWordArray.length === 0) { // && store.correctGuessArray.length === wordLength
        store.gameOver = true
        store.userWon = 1
        $('#incorrect-guesses').hide()
      } else if (store.incorrectGuessArray.length === 6) {
        store.gameOver = true
        store.userWon = -1

        $('#incorrect-guesses').hide()
        $('#incorrect-board').hide()
      }
      if (store.userWon === -1) {
        $('#letter-board').html(store.randGameWord)
      } else {
        $('#letter-board').html(store.underScoreArray)
      }
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
  // console.log(store.wordsList)
}

module.exports = {
  addHandlers,
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
  checkGuess,
  onDeletePrintWords,
  onDeleteHandleWords,
  onUpdateHandleWords
}
