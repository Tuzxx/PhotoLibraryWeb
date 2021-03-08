<template>
  <div :style="{ background: '#fff', padding: '24px', minHeight: '575px' }">
    <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="btnTest"/>
    <button @click="test"></button>
  </div>
</template>

<script>

  export default {
    name: 'test',
    components: {
      
    },
    methods: {
      btnTest(e) {
        let self = this
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('image_data', file)  // 通过append向form对象添加数据
        console.log(param.get('image_data')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        this.$ajax.post('http://localhost:9001/addphoto', param, config)
        .then(res => {
          if (res.data.code === 0) {
            self.ImgUrl = res.data.data
          }
          console.log(res.data)
        })
      },
      test() {
        console.log(this.$store.state.mask);
      }
    },
  }
</script>

<style>
  
</style>