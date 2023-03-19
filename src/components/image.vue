<template>
    <div>
      <img :src="'http://localhost:8080/api/image?timestamp=' + timestamp" style="max-width: 400px; max-height: 300px;"/>
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
  