<template>
<div id="registerFormbox">
  <div class="registerFormTitle">Create your account</div>
  <a-form :form="form" @submit="handleSubmit" class="registerForm" ref="registerForm">
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
                min: 5,
                message: 'length >= 5 ',
              },
              {
                max: 10,
                message: 'length <= 10 ',
              },
              {
                pattern: '^[^0-9][\\w_]',
                message: 'The input is not valid Username!'
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
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
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
                validator: validateToNextPassword,
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
    <a-form-item v-bind="formItemLayout" label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
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
      <a-button type="primary" html-type="submit" @click="registerAccount">
        Register
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import {axios_get, axios_post} from '../../api/http.js'

export default {
  name: 'registerForm',
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
      getCodeButtonAble: true
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
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
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    checkUsername(rule, value, callback) {
      const form = this.form
      axios_get('http://localhost:9001/getusername/'  + value)
      .then(res => {
        if(res == false) {
          callback("Username already exists")
        } else {
          callback()
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    getEmailCode() {
      const form = this.form
      this.getCodeButtonAble = false
      if(form.getFieldValue('email')){
        axios_get('http://localhost:9001/sendEmailCode/' + form.getFieldValue('email')+".com")
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
    registerAccount() {
      const form = this.form
      form.validateFields(err => {
        if (!err && form.getFieldValue('captcha') == this.code) {
          axios_post('http://localhost:9001/register', {
            username: form.getFieldValue('username'),
            password: form.getFieldValue('password'),
            email: form.getFieldValue('email')
          }).then(res => {
            this.$router.push('/register/success').catch(err => err)
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
  #registerFormbox {
    width: 70%;
    margin: 75px auto; 
  }

  .registerFormTitle {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom:30px;
  }

  .registerForm .ant-form-item-control {
    width: 300px;
  }
</style>