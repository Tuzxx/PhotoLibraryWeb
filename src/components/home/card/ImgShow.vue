<template>

</template>
<script>
export default {
  name: 'imgShow',
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>