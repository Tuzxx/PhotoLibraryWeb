<template>
  <div>
    <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>New</a-breadcrumb-item>
        <!-- <a-breadcrumb-item>App</a-breadcrumb-item> -->
      </a-breadcrumb>
      <div
        :style="{ background: '#fff', padding: '24px', minHeight: '575px' }"
        style="display: flex; flex-wrap:wrap;"
        >
        <div v-for="item in c_Data">
          <img-card :c_Data="item" :deleButtonShow="false"></img-card>
        </div>
      </div>
  </div>
</template>

<script>
  import imgCard from './card/ImgCard'
  import { axios_get } from '../../api/http'

  export default {
    name: 'new',
    components: {
      imgCard
    },
    data() {
      return {
        c_Data: {},
        test: ''
      }
    },
    methods: {

    },
    created() {
      axios_get(
        'http://1.15.90.245:9001/showall'
      ).then(res => {
        this.c_Data = res
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style>
  
</style>