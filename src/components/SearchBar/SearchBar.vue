<template src="./SearchBar.html"></template>

<script>
import { sendEmail } from '../../services/ajax'
import { LITERALS } from '../../services/constants'

export default {
  data() {
    return {
      find: '',
      emailDisabled: true,
    }
  },

  computed: {
    dblClickedDevs() {
      return this.$store.getters.getDblClickedDevs ? this.$store.getters.getDblClickedDevs.length : ''
    },
  },

  methods: {
    onFind() {
      if (this.find.length < 3) {
        return alert('Szukane słowo musi mieć conajmniej 3 znaki')
      }

      this.$store.dispatch('progressBar', true)
      this.$store.dispatch('findText', this.find)
    },

    onSelected() {
      this.$store.commit('READ_DEVS', this.$store.getters.getDblClickedDevs)

      this.emailDisabled = false
    },

    onResetSelected() {
      this.$store.dispatch('setDblClickedDevs', [])
      this.$store.dispatch('readDevs', {})
      this.$store.dispatch('progressBar', true)
      this.emailDisabled = true
    },

    onEmail() {
      const text = LITERALS.EMAIL_TEXT
      const devs = this.$store.getters.getDblClickedDevs

      const emails = devs.map(el => el.email)

      sendEmail(emails, text)
      this.emailDisabled = true
    },

    onNewDev() {
      this.$store.dispatch('openDialog', true)
      this.emailDisabled = true
    },
  },
}
</script>

<style scoped>
#searchbar {
  font-family: 'Roboto';
}

a {
  color: #2196f3;
  font-size: 1.2em;
  font-weight: 400;
  text-decoration: none;
}
</style>
