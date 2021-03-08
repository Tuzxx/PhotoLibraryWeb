<template>
  <div class="clearfix">
    <div class="uploadAvatarBox">
      <label for="Avatar" style="display:block; width: 120px; height: 120px; cursor: pointer;" v-show="!isLoad">
        <div class="uploadInputBox">
          <div>
            <div>
              <img src="@/assets/img/Plus.png">
            </div>
            <div>
              Upload
            </div>
            <input name="file" type="file" accept="image/png,image/gif,image/jpeg" id="Avatar" style="display: none;" @change="loadingImg" ref="inputImg" />
          </div>
        </div>
      </label>
      <div v-show="isLoad" class="uploadInputBox" style="position: relative;">
        <img :src="userPhoto" style="width: 100%; height: 100%; object-fit:cover" @mouseover="showButton">
        <div class="imgButton" :style="{display:showOrHide}" @mouseout="hideButton">
          <div>
            <a-icon type="eye" @click="showBigImg" />
            <a-icon type="delete" @click="deleteImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      isPreview: false,
      isLoad: false,
      userPhoto: "",
      showOrHide: 'none',
      iconColor: "#ffffff",
      avatarFile: ''
    };
  },
  methods: {
    loadingImg(e) {
      this.isLoad = true
      let index = e.target.files.length
      this.avatarFile = e.target.files[index-1]
      this.previewImg(e.target.files[index-1])
    },
    previewImg(file) {
      var that = this
      var reader = new FileReader();
      reader.onload = function (e) {
        that.userPhoto = e.target.result;
      }
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    showButton() {
      this.showOrHide = 'block'
    },
    hideButton() {
      this.showOrHide = 'none'
    },
    showBigImg() {
      this.$store.commit("maskChange")
      this.$store.commit("imgChange", this.userPhoto)
    },
    deleteImg() {
      this.isLoad = false
      this.$refs.inputImg.value = ''
    }
  },
  computed: {

  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.uploadAvatarBox {
  margin-bottom: 24px;
}

.uploadAvatarBox input {
  opacity: 0;
}

.uploadInputBox {
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  justify-content: center;
}

.uploadInputBox div{
  text-align: center;
}

.uploadInputBox div img{
  width: 32px;
  height: 32px;
}

.imgButton {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top: 0;
  left: 0;
}

.imgButton div{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.imgButton div svg {
  width: 16px;
  height: 16px;
  margin-top: 32px;
  color: #e6e6e6;
  cursor: pointer;
}

.imgButton div .anticon {
  display: block;
}

.imgButton div svg:hover {
  color: #ffffff;
}
</style>