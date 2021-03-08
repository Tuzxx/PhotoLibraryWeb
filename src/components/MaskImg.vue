<template>
    <div class="father" @click="hidePanel">
        <div class="mask" v-show="$store.state.mask.maskShow"></div>
        <div class="child" id="child" v-show="$store.state.mask.maskShow">
            <img :src="$store.state.mask.maskImg">
        </div>
    </div>
</template>

<script>
export default {
  name: "maskImg",
  data: function(){
      return {
          maskShow: true,
      }
  },
  methods: {
    hidePanel(event) {
      let dom = document.getElementById("child");
      if (dom) {
        if (!dom.contains(event.target)) {
        //这句是说如果我们点击到了id为child以外的区域
            this.$store.commit("maskChange");
        }
      }
    },
  },
}
</script>

<style>
.father{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1111;
}
.mask{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.3;
  position: fixed;
  z-index: 1111;
}
.child{
  position: fixed;
  width: 400px;
  height: 400px;
  text-align: center;
  line-height: 400px;
  top: calc(50% - 200px);
  left: calc(50% - 200px);
  position: fixed;
  z-index: 1111;
}
.child img {
  max-width: 600px;
}
</style>
