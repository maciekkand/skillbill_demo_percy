import axios from 'axios'
import { LITERALS } from './constants'
import { fetch, findText } from './ajaxHelpers'
import updateView from './helpers'

axios.defaults.headers.post['Content-Type'] = 'application/json'

export const ajaxReadDevs = (context, selectedSkills) => {
  console.log('selectedSkills = ', selectedSkills)

  axios
    .get(fetch(context, selectedSkills))
    .then(res => {
      context.commit('READ_DEVS', res.data)
      console.log(res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxInsertDev = (context, dev) => {
  // const countUrl = LITERALS.PREFIX + '?&c=true&apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI'
  const countUrl = LITERALS.PREFIX + '?&c=true&' + LITERALS.SUFFIX

  const getCount = async () => axios
    .get(countUrl)
    .then(res => res.data)
    .catch(err => console.log('Error 1: ', err))

  const getLastDocumentId = async lastDocumentUrl => axios
    .get(lastDocumentUrl)
    .then(res => res.data[0].id)
    .catch(err => console.log('Error 2: ', err))

  const insertDocument = async lastDocumentId => {
    dev.id = lastDocumentId + 1

    return axios
      .post(LITERALS.DB, dev)
      .then(() => {
        alert('Dane zostały zapisane na serwerze')
      })
      .catch(err => {
        alert('Błąd zapisu na serwerze: ', err)
      })
  }

  async function insertDev() {
    try {
      const count = (await getCount()) - 1
      const query = LITERALS.PREFIX + `?s={id:1}&sk=${count}&l=1&` + LITERALS.SUFFIX
      const lastDocumentId = await getLastDocumentId(query)
      await insertDocument(lastDocumentId)
      context.commit('PROGRESS_BAR', false)
    }
    catch (err) {
      context.commit('PROGRESS_BAR', false)
      alert('Błąd modyfikacji danych na serwerze: ', err)
    }
  }
  insertDev()
}

export const ajaxDeleteDev = (context, dev) => {
  const allDevs = context.getters.readDevs
  const _id = dev._id.$oid
  // const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?` + LITERALS.SUFFIX
  axios
    .delete(url)
    .then(() => {
      alert('Skasowano na serwerze')
      updateView(context, allDevs, dev)
    })
    .catch(err => console.log('Błąd: ', err))
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxUpdateDev = (context, dev) => {
  // const url = `${LITERALS.PREFIX}/${dev._id.$oid.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const url = `${LITERALS.PREFIX}/${dev._id.$oid.replace(/"/g, '')}?` + LITERALS.SUFFIX
  const allDevs = context.getters.readDevs

  axios
    .put(url, dev)
    .then(() => {
      for (let i = 0; i < allDevs.length; i++) {
        if (allDevs[i].id === dev.id) {
          allDevs.splice(i, 1)
          allDevs.push(dev)
          context.commit('READ_DEVS', allDevs)
          break
        }
      }
      alert('Zapisano na serwerze')
    })
    .catch(err => {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxUpdateDates = (context, calendarDev) => {
  const _id = calendarDev._id.$oid
  const dates = calendarDev.dates
  // const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?apiKey=XRr-4BkluC11FFgtbOnUhzUlodvp8RfI`
  const url = `${LITERALS.PREFIX}/${_id.replace(/"/g, '')}?` + LITERALS.SUFFIX
  const allDevs = context.getters.readDevs
  const datesObj = { $set: { dates } }

  axios
    .put(url, datesObj)
    .then(() => {
      for (let i = 0; i < allDevs.length; i++) {
        if (allDevs[i].id === calendarDev.id) {
          allDevs.splice(i, 1)
          allDevs.push(calendarDev)
          break
        }
      }

      context.commit('READ_DEVS', allDevs)
    })
    .catch(err => {
      alert('Błąd zapisu dat na serwerze: ', err)
    })
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const ajaxFindText = (context, text) => {
  axios
    .get(findText(text))
    .then(res => {
      context.commit('READ_DEVS', res.data)
    })
    .catch(err => console.log('My error: ', err))
    .finally(() => {
      context.commit('PROGRESS_BAR', false)
    })
}

export const sendEmail = (recipients, text) => {
  const subject = LITERALS.EMAIL_SUBJECT
  const proxy = LITERALS.EMAIL_PROXY

  recipients.forEach(el => {
    const mailUrl = proxy + '?to=' + el + '&subject=' + subject + '&html=' + text

    axios
      .post(mailUrl)
      .then(() => {
        alert('Email został wysłany. Sprawdź za chwilę skrzynkę')
      })
      .catch(err => console.log('Mail error: ', err))
  })
}
