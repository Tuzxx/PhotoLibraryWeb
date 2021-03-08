<template>
  <a-result
    status="success"
    title="Successfully Registered Account"
    sub-title="After five seconds, automatically jump to the login page"
  >
    <template #extra>
      <a-button key="console" type="primary" @click="btnToLogin">
        To Login
      </a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$router.push('/login').catch(err => err)
    }, 5000)
  },
  methods: {
    btnToLogin() {
      this.$router.push('/login').catch(err => err)
    }
  },
};
</script>