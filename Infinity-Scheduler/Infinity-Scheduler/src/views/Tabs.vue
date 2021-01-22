<template lang="html">
  <div class='navigation'>
    <div class='tabs'>
      <ul class='tabs__header'>
        <li v-for='(tab, index) in tabs'
          :key='tab.title'
          @click='selectTab(index)'
          :class='{"tabs__selected": (index == selectedIndex)}'>
          {{ tab.title }}
        </li>
      </ul>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: []         // all of the tabs
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.selectedIndex = i

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  }
}
</script>

<style scoped>

  .tabs__header{
    padding-left: 60%;
  }

  li {
    list-style-type: none;
    margin-right: 12%;
    cursor: pointer;
    display:inline-block;
  }

 .tabs__selected {
     color: #0670bf;
  }

</style>
