const config = require('./../config')
const store = require('./../store')

const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data
  })
}

const signOut = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const createWord = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/words',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getWords = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/words',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteWords = function (id) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/words/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateWord = function (data, id) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/words/' + id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  createWord,
  getWords,
  deleteWords,
  updateWord
}
