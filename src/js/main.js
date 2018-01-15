import firebase from 'firebase'
import { firebaseConfig } from './setting'
firebase.initializeApp(firebaseConfig)

import Vue from 'vue'
import store from './store'
import RegistrationForm from './components/RegistrationForm'
import GoogleMap from './components/GoogleMap'

/* eslint-disable no-new */
new Vue({
  el: '.js-form',
  store,
  template: '<RegistrationForm/>',
  components: { RegistrationForm }
})

/* eslint-disable no-new */
new Vue({
  el: '.js-map',
  template: '<GoogleMap/>',
  components: { GoogleMap }
})