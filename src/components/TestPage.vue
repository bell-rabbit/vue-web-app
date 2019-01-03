<template>
  <div class="hello">
      <p v-for="item in list">{{item}}</p>
  </div>
</template>

<script>
export default {
  name: 'TestPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  mounted () {
    const self = this
    $.getJSON('/common/data/data.json').done(function (data) {
      console.log(data)
      if (data.status === 'offline') {
        alert('offline')
      }

      self.list = data.data
    })
  }
}
</script>
