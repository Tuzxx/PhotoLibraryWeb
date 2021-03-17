<template>
  <div class="imgCard">
    <div class="c-user">
        <a-icon v-show="deleButtonShow" slot="indicator" type="close" class="closeButton" @click="deleteCard" />
      <div class="c-user-content">
        <div>
          <a-avatar :size="64" :src="c_Data.avatarUrl"/>
        </div>
        <div>{{c_Data.username}}</div>
        <div>{{c_Data.content}}</div>
      </div>
    </div>
    <div class="c-img">
      <img :src="c_Data.imgUrl">
    </div>
  </div>
</template>

<script>
  import imgShow from './ImgShow.vue'
  import {axios_get} from '../../../api/http.js'
  import axios from 'axios'

  export default {
    name: 'imgCard',
    components: {
      imgShow,
    },
    data() {
      return {
      }
    },
    props: [
      "c_Data",
      "deleButtonShow"
    ],
    methods: {
      deleteCard() {
        axios.delete("http://1.15.90.245:9001/deletecard/" + this.c_Data.pid)
        .then(res => {
          console.log(res);
          location.reload()
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
  }
</script>

<style>
  .imgCard {
    display: flex;
    width: 80%;
    margin: 20px auto;
    border: 1px solid #f1f1f1;
    height: 508.03px;
    align-items: center;
    padding: 0;
    transition: .5s;
    padding: 5px;
  }

  .imgCard:hover {
    box-shadow: 8px 8px 16px rgba(0,0,0,0.2);
  }
  
  .c-user {
    flex: 1;
    height: 100%;
    border-right: 1px solid #f1f1f1;
  }

  .c-user-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 100px;
    height: 40%;
  }

  .c-img {
    height: 100%;
    flex: 2.5;
  }

  .c-img img {
    width: 100%;
    height: 100%;
    object-fit:cover
  }

  .closeButton{
    align-self: start;
    transition: all 1s;
    position: absolute;
    z-index: 2;
  }

  .closeButton:hover{
    transform: rotate(180deg);
  }
</style>