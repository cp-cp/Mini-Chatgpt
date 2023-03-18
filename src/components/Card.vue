<template>
    <el-card class="text-card">
      <!-- <p> -->
      <div class="text-container">
        {{ displayText }}
      </div>
      <!-- </p> -->
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
          this.$emit('text-loading')
          this.currentLength++
        } else {
          clearInterval(this.timer)
          this.$emit('text-complete')
        }
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
  </script>
  