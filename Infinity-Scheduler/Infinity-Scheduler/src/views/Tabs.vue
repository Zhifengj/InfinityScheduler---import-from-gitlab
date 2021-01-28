<template lang="html">
  <div class='navigation'>
    <div class='tabs'>
      <ul class='tabs__header'>
        <img v-for='(tab, index) in tabs'
          :key='tab.title'
          @click='selectTab(index)'
          :class='{"tabs__selected": (index == selectedIndex)}'
          :src='tab.title' width="35" height="35">
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
    border: 2px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 0;
  }

  img {
    margin-left: 120px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    display:inline-block;
  }

 .tabs__selected {
     margin-bottom: 15px;
  }

</style>
