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
  store.authMenuShow = true
  store.printShow = true
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')

  $('#sign-in').hide()
  $('#sign-up').hide()


  $('#change-password').show()
  $('#sign-out').show()
  $('#create-word').show()
  $('#get-words').show()
  $('#delete-word').show()
  $('#print-words').show()
  $('#start-game').show()
  $('#guess-form').show()
  $('#print-storeList').show()
  $('#update-word').show()

  $('#word-menu').hide()

  $('#auth-button').show()
  $('#auth-menu').hide()

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

  $('#incorrect-guesses').hide()
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

  $('#auth-menu').hide()
  $('#word-menu').hide()


  $('#auth-button').hide()
  $('#auth-menu').hide()

  $('#content').html('')
  $('#game-message').html('')
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
  if (data.words) {
    const printWords = showWords({words: data.words})
    $('#content').html(printWords)
    store.wordsList = data.words
    $('#hide-words').show()
    $('#print-words').hide()
  } else {
    $('#auth-message').html('There are no words to be printed, please make a word and try again')
  }

}

const onGetPrintFailure = function (data) {
  $('#auth-message').html('Word cannot be printed, please try again')
}

const onGetWordsSuccess = function (data) {
  store.wordsList = data.words
}

const onGetWordsFailure = function (data) {
  $('#auth-message').html('Cannot get words, please try again')
}

const onDeleteWordsSuccess = function (data) {
  $('#auth-message').html('Deleted word')
}

const onDeleteWordsFailure = function (data) {
  $('#auth-message').html('Cannot delete words, please try again')
}

const onUpdateWordSuccess = function (data) {
  $('#auth-message').html('updated word')
}

const onUpdateWordFailure = function (data) {
  $('#auth-message').html('cannot update word, please try again')
}

const onStartGameSuccess = function (data) {
  // // console.log(data)
  store.wordsList = data.words
  store.gameOver = false
  // // console.log(store.wordsList)
  let num = Math.random() * (store.wordsList.length - 1)
  num = Math.floor(num)
  // // console.log(num)
  store.randGameWord = data.words[num].text
  // console.log(store.randGameWord)
  store.gameWordArray = []
  let underScoreLetterString = ''
  let realLetterString = ''
  for (let i = 0; i < store.randGameWord.length; i++) {
    if (store.randGameWord.charAt(i) !== ' ') {
      underScoreLetterString = underScoreLetterString + ' _ '
      realLetterString = realLetterString + ' ' + store.randGameWord.charAt(i) + ' '

      store.gameWordArray.push(store.randGameWord.charAt(i))
      // // console.log(underScoreLetterString + ' ' + ' letter')
    } else {
      underScoreLetterString = underScoreLetterString + '-'
      realLetterString = realLetterString + '-'
       // // console.log(underScoreLetterString + ' ' + ' space')
    }
  }
  store.correctGuessArray = []
  store.incorrectGuessArray = []

  store.underScoreArray = underScoreLetterString.split('')
  store.realUnderScoreArray = realLetterString.split('')
  $('#letter-board').html(store.underScoreArray)
}

const onStartGameFailure = function (data) {

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
  onGetWordsFailure,
  onDeleteWordsSuccess,
  onDeleteWordsFailure,
  onUpdateWordSuccess,
  onUpdateWordFailure,
  onStartGameSuccess,
  onStartGameFailure
}
