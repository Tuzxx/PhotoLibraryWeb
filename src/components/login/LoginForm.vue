<template>
  <div>
    <div id="loginform">
      <div style="text-align: center; font-size: 36px; margin-bottom: 30px;">
        Login
      </div>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'username',
              { rules: [{ required: true, message: 'Please input your username!' }] },
            ]"
            placeholder="Username"
            autocomplete="on"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Please input your Password!' }] },
            ]"
            type="password"
            placeholder="Password"
            autocomplete="off"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            {{password}}
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            Remember me
          </a-checkbox>
          <a class="login-form-forgot" @click="btnToForgetPwd">
            Forgot password
          </a>
          <a-button type="primary" html-type="submit" class="login-form-button" @click="btnToHome">
            Log in
          </a-button>
          Or
          <a @click="btnToRegister">
            register now!
          </a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import { axios_post } from '../../api/http'

  export default {
    name: 'loginform',
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    data() {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      btnToRegister() {
        this.$router.push('/register').catch(err => err)
      },
      btnToForgetPwd() {
        this.$router.push('/forgetpwd').catch(err => err)
      },
      btnToHome() {
        this.form.validateFields((err, values) => {
          if (!err) {
            axios_post(
              'http://localhost:9001/login',
              {
                username: values.username,
                password: values.password
              }).then(res => {
              if(res != "error") {
                this.$store.dispatch("getUser", values.username)
                this.$router.push('/home/new').catch(err => err)
              } else {
                console.log(" Invalid username or password")
              }
            }).catch(err => {
              console.log(err)
            })
          }
        });
      }
    },
  }
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

#loginform {
  width: 400px;
  height: 400px;
  border: 1px solid #e7e7e7;
  margin: 100px auto;
  padding: 40px;
  border-radius: 20px;
}
</style>