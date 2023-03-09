<template>
  <div>
    <el-autocomplete
      v-model="inputValue"
      :fetch-suggestions="querySearchAsync"
      @select="handleSelect"
      @keydown.enter="handleEnter"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      options: []
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      const data = [
        {value:'Apple'},
        {value:'Fig'},
        {value:'Grape'}
      ];
   //   const results = queryString
    //    ? data.filter(this.createFilter(queryString))
     //   : data;

      cb(data);
    },
    createFilter(queryString) {
      return option => {
        return option.toLowerCase().indexOf(queryString.toLowerCase()) !== -1;
      };
    },
    handleSelect(item) {
      console.log('选中了：', item);
    },
    handleEnter() {
      alert('回车事件触发');
      // 可以在这里处理回车事件
    }
  }
};
</script>
