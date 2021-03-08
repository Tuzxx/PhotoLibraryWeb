<template>
  <div id="components-back-top-demo-custom">
    <a-back-top>
      <div class="ant-back-top-inner">
        <img src="../../assets/img/BackTop.png">
      </div>
    </a-back-top>
  </div>
</template>

<script>
  export default {
    name: 'backTop'
  }
</script>

<style scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 60px;
  width: 60px;
  line-height: 60px;
  border-radius: 30px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  opacity:0.4;
}
#components-back-top-demo-custom .ant-back-top-inner:hover {
  opacity: 1;
}
</style>