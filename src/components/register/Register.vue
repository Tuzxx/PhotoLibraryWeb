<template>
<div>
  <div class="formbg">
    <router-link to='/register'></router-link>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: 'register',
}
</script>

<style>
.formbg {
  width: 70%;
  height: 600px;
  border: 1px solid #ebebeb;
  margin: 50px auto;
  border-radius: 20px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.19);
}
</style>
