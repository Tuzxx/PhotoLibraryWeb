<template>
<div>
  <a-breadcrumb :style="{ margin: '16px 0' }">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Profile</a-breadcrumb-item>
    <!-- <a-breadcrumb-item>App</a-breadcrumb-item> -->
  </a-breadcrumb>
  <div :style="{ background: '#fff', padding: '24px', minHeight: '575px' }">
    <router-link to="/profile"></router-link>
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: 'profile',
}
</script>

<style>

</style>
