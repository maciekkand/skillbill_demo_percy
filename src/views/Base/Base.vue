<template src="./Base.html"></template>

<script>
import SearchBar from '../../components/SearchBar/SearchBar.vue'
import Filter from '../../components/Filter/Filter.vue'
import Table from '../../components/Table/Table.vue'

export default {
  components: {
    'skillbill-searchbar': SearchBar,
    'skillbill-filter': Filter,
    'skillbill-table': Table,
  },
}
</script>
