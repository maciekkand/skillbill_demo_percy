<template src="./Table.html"></template>
import { LITERALS } from '../../services/constants';

<script>
import { LITERALS } from '../../services/constants'

export default {
  data: () => ({
    expand: false,
    selected: [],
    headers: [
      { text: 'id', sortable: true, value: 'id' },
      { text: 'title', sortable: true, value: 'title' },
      { text: 'First', sortable: false, value: 'first' },
      { text: 'Last', sortable: false, value: 'last' },
      { text: 'Skill 1', sortable: false, value: 'skill1' },
      { text: 'Rank 1', sortable: true, value: 'rank1' },
      { text: 'Skill 2', sortable: false, value: 'skill2' },
      { text: 'Rank 2', sortable: true, value: 'rank2' },
      { text: 'Skill 3', sortable: false, value: 'skill3' },
      { text: 'Rank 3', sortable: true, value: 'rank3' },
      { text: 'Picture', sortable: false, value: 'picture' },
      { text: 'Tools', sortable: false, value: '' },
    ],
    editedIndex: -1,
    editedItem: {
      first: '',
      last: '',
      title: '',
      skill1: '',
      rank1: '',
      skill2: '',
      rank2: '',
      skill3: '',
      rank3: '',
    },
    defaultItem: {
      first: '',
      last: '',
      title: '',
      skill1: '',
      rank1: '',
      skill2: '',
      rank2: '',
      skill3: '',
      rank3: '',
    },
    ranks: LITERALS.RANKS,
    skills: LITERALS.SKILLS,
    title: LITERALS.TITLE,
    newDevs: [],
    calendar: false,
    picker: [],
    devId: null,
    devFirst: null,
    devLast: null,
  }),

  computed: {
    devs() {
      return this.$store.getters.readDevs
    },

    formTitle() {
      return 'Developer Data'
    },

    dialog() {
      return this.$store.getters.getOpenDialog || false
    },

    progressBar() {
      return this.$store.getters.getProgressBar
    },
  },

  created() {
    this.$store.dispatch('readDevs')
  },

  methods: {
    onCalendar(dev) {
      this.devId = dev.id
      this.devFirst = dev.first
      this.devLast = dev.last
      this.picker = dev.dates || []
      this.calendar = true
      this.$store.dispatch('setCalendarDev', dev)
    },

    onCalendarSave() {
      const calendarDev = this.$store.getters.getCalendarDev
      calendarDev.dates = this.picker
      this.$store.dispatch('updateCalendar', calendarDev)
      this.$store.dispatch('progressBar', true)
      this.calendar = false
    },

    onCalendarClose() {
      this.picker = []
      this.calendar = false
    },

    onEdit(item) {
      this.editedItem = Object.assign({}, item)
      this.$store.dispatch('openDialog', true)
    },

    onDelete(item) {
      if (confirm('Na pewno chcesz usunąć ten rekord ?')) {
        this.$store.dispatch('deleteDev', item)
      }
    },

    onNewDevSave() {
      if (!this.editedItem.id) {
        this.$store.dispatch('insertDev', this.editedItem)
      }
      else {
        this.$store.dispatch('updateDev', this.editedItem)
      }

      this.$store.dispatch('openDialog', false)
      this.$store.dispatch('progressBar', true)
      this.editedItem = {}
    },

    onNewDevClose() {
      this.$store.dispatch('openDialog', false)
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    onDblClick(item) {
      const selectedDevs = this.$store.getters.getDblClickedDevs || []
      const selectedDevsLength = selectedDevs.length

      for (let index = 0; index < selectedDevsLength; index++) {
        if (selectedDevs[index].id === item.id) {
          return
        }
      }
      selectedDevs.push(item)
      this.$store.dispatch('setDblClickedDevs', selectedDevs)
    },
  },
}
</script>

<style scoped>
#table {
  margin-top: 0px !important;
  margin-bottom: 0px;
}

.filters {
  transform: scale(1, 1);
  transform-origin: left;
}

#calendar_heading {
  color: #2196f3;
  margin: 0 0 10px 0;
}
</style>
