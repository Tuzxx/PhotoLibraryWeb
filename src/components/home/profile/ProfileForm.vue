<template>
  <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="Username">
      <div>{{$store.state.username}}</div>
    </a-form-model-item>
    <a-form-model-item label="Avatar" style="margin-bottom: 0px;">
      <up-load-avatar ref="upAva"></up-load-avatar>
    </a-form-model-item>
    <a-form-model-item label="Birthday">
      <a-date-picker
        v-model="form.birthDate"
        type="date"
        style="width: 100%;"
      />
    </a-form-model-item>
    <a-form-model-item label="Private">
      <a-switch v-model="form.private" />
    </a-form-model-item>
    <a-form-model-item label="Gender">
      <a-radio-group v-model="form.gender">
        <a-radio value="male">
          Male
        </a-radio>
        <a-radio value="female">
          Female
        </a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="Profile">
      <a-input v-model="form.profile" type="textarea" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        Save
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import {axios_post} from 'api/http'
import UpLoadAvatar from './UpLoadAvatar.vue'

export default {
  name: 'profileForm',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        username: this.$store.state.username,
        birthDate: this.$store.state.birthDate,
        private: this.$store.state.private,
        gender: this.$store.state.gender,
        profile: this.$store.state.profile,
        avatarUrl: this.$store.state.avatarUrl
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.$refs.upAva.avatarFile != '') {
        var image = new FormData()
        image.append('image_data', this.$refs.upAva.avatarFile)
        this.$ajax.post('http://localhost:9001/addphoto', image, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          this.form.avatarUrl = res.data
          axios_post('http://localhost:9001/updateuserprofile', this.form)
          .then(res => {
            if(res == "success") {
              alert("添加成功")
            }
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        alert("error Image")
      }
    },
  },
  components: {
    UpLoadAvatar
  },
};
</script>