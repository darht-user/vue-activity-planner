<template>
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a 
            @click="emitFiltered('all')"
            :class="{'is-active': filterOption==='all'}"
            class="navbar-item">All</a>
          <a 
            @click="emitFiltered('inprogress')"
            :class="{'is-active': filterOption==='inprogress'}"
            class="navbar-item">In Progress</a>
          <a 
            @click="emitFiltered('finished')"
            :class="{'is-active': filterOption==='finished'}"
            class="navbar-item">Finished</a>
          <a 
            @click="emitFiltered('notstarted')"
            :class="{'is-active': filterOption==='notstarted'}"
            class="navbar-item">Not Started</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      filterOption: 'all'
    }
  },
  methods: {
    emitFiltered(filterOption) {
      this.filterOption = filterOption
      this.$emit('filterSelected', filterOption)
    }
  }
}
</script>

