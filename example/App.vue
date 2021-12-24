<template>
  <div id="app">
    <pdf-js-vue style="height: 800px;" :src="url"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      url: ''
    }
  }
}
</script>
