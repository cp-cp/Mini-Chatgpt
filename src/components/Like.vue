<template>
  <div>
    <el-button type="primary" @click="toggleLike">{{ buttonText }}</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store/store';

export default {
  props: ['questionId'],
  data() {
    return {
      likeCount: 0,
      postId: this.questionId,
      liked: false,
    }
  },
  computed: {
    buttonText() {
      return this.liked ? '取消点赞' : '点赞';
    },
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:8080/user/checkLikedQuestion/${this.postId}/${store.state.userid}`)
      this.liked = response.data.liked;
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async toggleLike() {
      try {
        //console.log(this.postId);
        const url = this.liked
          ? `http://localhost:8080/user/deleteLikedQuestion/${this.postId}/${store.state.userid}`
          : `http://localhost:8080/user/addLikedQuestion/${this.postId}/${store.state.userid}`
        await axios.get(url)
        this.liked = !this.liked
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style></style>
