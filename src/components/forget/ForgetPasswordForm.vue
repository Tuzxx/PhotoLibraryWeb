<template>
<div id="forgetPwd">
  <div class="forgetPwdTitle">Retrieve Password</div>
  <a-form :form="form" @submit="handleSubmit" class="forgetPwdForm" ref="forgetPwdForm">
    <a-form-model-item v-bind="formItemLayout" label="Username">
      <a-input
        v-decorator="[
          'username',
          {
            rules: [
              {
                required: true,
                message: 'Please input your Username!',
              },
              {
                validator: checkUsername,
              }
            ],
          },
        ]"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-item v-bind="formItemLayout" label="E-mail">
      <div>{{email}}</div>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="New Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'length >= 6 ',
              },
              {
                max: 20,
                message: 'length <= 20 ',
              },
              {
                whitespace: true
              }
            ],
          },
        ]"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Captcha"
      extra="Verify your Email"
    >
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'captcha',
              { rules: [{ required: true, message: 'Please input the captcha you got!' }] },
            ]"
            autocomplete="off"
          />
        </a-col>
        <a-col :span="12">
          <a-button v-if="getCodeButtonAble" @click="getEmailCode">{{getCodeButton}}</a-button>
          <a-button v-else>{{getCodeButton}}</a-button>
        </a-col>
      </a-row>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit" @click=" retrievePassword">
          Retrieve
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import {axios_get, axios_post} from '../../api/http.js'

export default {
  name: 'forgetPwdForm',
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      code: "",
      getCodeButton: "Get captcha",
      countDownTime: 60,
      getCodeButtonAble: true,
      email: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'forgetPwd' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    checkUsername(rule, value, callback) {
      const form = this.form
      axios_get('http://1.15.90.245:9001/getusername/'  + value)
      .then(res => {
        if(res == false) {
          axios_get("http://1.15.90.245:9001/getuseremail/" + value).then(res => {
            this.email = res
          }).catch(err => {
            console.log(err)
          })
          callback()
        } else {
          callback("Username doesn't exists")
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getEmailCode() {
      const form = this.form
      this.getCodeButtonAble = false
      if(this.email != "error"){
        axios_get('http://1.15.90.245:9001/sendEmailCode/' + this.email)
        .then(res => {
          this.code = res;
        })
        .catch(err => {
          console.log(err)
        })
        var auth_timetimer = setInterval(() => {
          this.getCodeButton = this.countDownTime + 's'
          this.countDownTime--
          if(this.countDownTime <= 0) {
            this.getCodeButtonAble = true
            this.getCodeButton = "Get captcha"
            this.countDownTime = 60
            clearInterval(auth_timetimer);
          }
        }, 1000)
      } else {
        alert("Please enter the Email")
      }
    },
    retrievePassword() {
      const form = this.form
      form.validateFields(err => {
        if (!err && form.getFieldValue('captcha') == this.code) {
          axios_post('http://1.15.90.245:9001/updatePassword', {
            username: form.getFieldValue('username'),
            password: form.getFieldValue('password'),
          }).then(res => {
            if(res == "success") {
              alert("success and back to login page")
              setTimeout(() => {
                this.$router.push('/login').catch(err => err)
              }, 3000)
            }
          }).catch(err => {
            console.log(err)
          })
        } else if (form.getFieldValue('captcha') != this.code) {
          alert("Captcha is wrong")
          return false
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
  },
};
</script>

<style>
  #forgetPwd {
    width: 70%;
    margin: 75px auto; 
  }

  .forgetPwdTitle {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom:30px;
  }

  .forgetPwdForm .ant-form-item-control {
    width: 300px;
  }
</style>