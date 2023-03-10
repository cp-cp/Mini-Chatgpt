<template>
    <el-card class="text-card">
      <div class="text-container">
        {{ displayText }}
      </div>
    </el-card>
  </template>
  
  <script>
  export default {
    props:['content'],
    data() {
      return {
        text: this.content,
        currentLength: 0
      }
    },
    computed: {
      displayText() {
        return this.text.substring(0, this.currentLength)
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.currentLength < this.text.length) {
          this.currentLength++
        } else {
          clearInterval(this.timer)
        }
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
  </script>
  