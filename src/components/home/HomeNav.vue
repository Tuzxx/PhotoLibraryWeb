<template>
  <div>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <div class="avatar">
        <img class="circleImg" :src="$store.state.avatarUrl"/>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="btnToNew">
          New
        </a-menu-item>
        <a-menu-item key="2" @click="btnToExplore">
          Mine
        </a-menu-item>
        <a-menu-item key="3" @click="btnToProfile">
          Profile
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <router-link to="/new"></router-link>
      <router-link to="/mine"></router-link>
      <router-link to="/profile"></router-link>
      <keep-alive>
        <router-view/>
      </keep-alive>
      <back-top></back-top>
    </a-layout-content>

    <a-layout-footer :style="{ textAlign: 'center' }">
      Photo Library ©2020 Created by Tuzx
    </a-layout-footer>
  </a-layout>
  <mask-img></mask-img>
  </div>
</template>

<script>
  import backTop from './BackTop.vue'
  import maskImg from '../MaskImg.vue'

  export default {
    name: 'homeNav',
    methods: {
      btnToNew() {
        this.$router.push('/home/new').catch(err => err)
      },
      btnToExplore() {
        this.$router.push('/home/mine').catch(err => err)
      },
      btnToProfile() {
        this.$router.push('/home/profile').catch(err => err)
      },
    },
    components: {
      backTop,
      maskImg
    },
    data() {
      return {
        
      }
    },
    created() {
      if(sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))
        ))
      }

      window,addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    },
    mounted() {
      this.$store.dispatch("getUser", this.$store.state.username)
    },
  }
</script>

<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

#components-layout-demo-fixed .avatar {
  width: 40px;
  height: 40px;
  margin: 8px;
  float: right;
  overflow: hidden;
  border-radius: 30px;
  position: relative;
}

.circleImg{
  width:40px;
  height: 40px;
  object-fit: cover;
  position: absolute;
  top: -6;
}
</style>