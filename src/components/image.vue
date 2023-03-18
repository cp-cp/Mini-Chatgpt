<template>
    <div>
      <img :src="'http://localhost:8081/api/image?timestamp=' + timestamp" />
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        timestamp: new Date().getTime()
      }
    }
  }
  </script>
  