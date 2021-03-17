<template>
  <div>
    <post-button></post-button>
    <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Mine</a-breadcrumb-item>
      </a-breadcrumb>
    <div
      :style="{ background: '#fff', padding: '24px', minHeight: '575px' }"
      style="display: flex; flex-wrap:wrap;"
    >
      <div v-for="item in c_Data">
        <img-card :c_Data="item" :deleButtonShow="true"></img-card>
      </div>
    </div>
  </div>
</template>

<script>
  import imgCard from './card/ImgCard'
  import { axios_get } from '../../api/http'
  import postButton from './postCard/PostButton.vue'

  export default {
    name: 'mine',
    components: {
      imgCard,
      postButton
    },
    data() {
      return {
        c_Data: {},
      }
    },
    methods: {
      reload() {
        console.log("reload");
        location.reload();
      }
    },
    created() {
      axios_get(
        'http://1.15.90.245:9001/showoneall/' + this.$store.state.id
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