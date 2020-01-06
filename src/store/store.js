import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {
  ajaxReadDevs, ajaxInsertDev, ajaxUpdateDev, ajaxDeleteDev, ajaxUpdateDates, ajaxFindText
} from '../services/ajax'

Vue.use(Vuex)

function initialState() {
  return {
    devs: [],
    dblClickedDevs: null,
    selectedDevs: [],
    openDialog: false,
    calendarDev: null,
    progressBar: false,
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: initialState,

  getters: {
    readDevs: state => state.devs,
    getDblClickedDevs: state => state.dblClickedDevs,
    getOpenDialog: state => state.openDialog,
    getCalendarDev: state => state.calendarDev,
    getProgressBar: state => state.progressBar,
  },

  mutations: {
    READ_DEVS(state, devs) {
      state.devs = devs
    },

    SET_DBLCLICKED_DEVS(state, devs) {
      state.dblClickedDevs = devs
    },

    OPEN_DIALOG(state, bool) {
      state.openDialog = bool
    },

    SET_CALENDAR_DEV(state, dev) {
      state.calendarDev = dev
    },

    FIND_TEXT(state, text) {
      state.text = text
    },

    PROGRESS_BAR(state, bool) {
      state.progressBar = bool
    },
  },

  actions: {
    readDevs(context, selectedSkills) {
      ajaxReadDevs(context, selectedSkills)
    },

    setDblClickedDevs(context, devs) {
      context.commit('SET_DBLCLICKED_DEVS', devs)
    },

    deleteDev(context, dev) {
      ajaxDeleteDev(context, dev)
    },

    insertDev(context, dev) {
      ajaxInsertDev(context, dev)
    },

    updateDev(context, dev) {
      ajaxUpdateDev(context, dev)
    },

    updateCalendar(context, calendarDev) {
      ajaxUpdateDates(context, calendarDev)
    },

    openDialog(context, bool) {
      context.commit('OPEN_DIALOG', bool)
    },

    setCalendarDev(context, dev) {
      context.commit('SET_CALENDAR_DEV', dev)
    },

    findText(context, text) {
      ajaxFindText(context, text)
    },

    progressBar(context, bool) {
      context.commit('PROGRESS_BAR', bool)
    },
  },
})
