<template>
  <div>
    <div class="post-button-box">
      <div class="post-button">
        <div class="post-button-inner" @click="showModal">
          <img src="../../../assets/img/Post.png">
        </div>
      </div>
    </div>
    <a-modal v-model="visible" title="Image Card" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
      <post-form ref="postForm"></post-form>
    </a-modal>
  </div>
</template>

<script>
  import postForm from './PostForm.vue'
  import {axios_post} from '../../../api/http.js'

  export default {
    name: 'postButton',
    components: {
      postForm
    },
    data() {
      return {
        loading: false,
        visible: false
      }
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        let that = this
        that.loading = true;

        var image = new FormData()
        image.append('image_data', this.$refs.postForm.$refs.postFormImg.imgFile)
        this.$ajax.post('http://localhost:9001/addphoto', image, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          let date = new Date()
          let postForm = that.$refs.postForm.postCard
          postForm.uid = that.$store.state.id
          postForm.username = that.$store.state.username
          postForm.avatarUrl = that.$store.state.avatarUrl
          postForm.imgUrl = res.data
          
          axios_post("http://localhost:9001/postcard", postForm).then(res => {
            alert("Post successfully")
            that.loading = false
            that.visible = false
            this.$parent.reload()
          })
        })
      },
      handleCancel(e) {
        this.visible = false;
      },
    },
  }
</script>

<style>
  .post-button-box {
    box-sizing: border-box;
  }

  .post-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: fixed;
    right: 100px;
    bottom: 160px;
    z-index: 10;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .post-button-inner {
    box-sizing: border-box;
    height: 60px;
    width: 60px;
    line-height: 60px;
    border-radius: 30px;
    color: #fff;
    text-align: center;
    font-size: 20px;
    opacity: 0.4;
  }

  .post-button-inner:hover {
    opacity: 1;
  }
</style>