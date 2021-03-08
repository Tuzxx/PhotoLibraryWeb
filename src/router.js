import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/Login'
import LoginForm from './components/login/LoginForm'
import Register from './components/register/Register'
import RegisterForm from './components/register/RegisterForm'
import ForgetPwd from './components/forget/ForgetPassword'
import ForgetPwdForm from './components/forget/ForgetPasswordForm'
import Home from './components/home/HomeNav'
import New from './components/home/New'
import Mine from './components/home/Mine'
import Profile from './components/home/profile/Profile'
import ProfileForm from './components/home/profile/ProfileForm'
import Test from './components/home/test/Test'
import RegisterSuccess from './components/register/RegisterSuccess'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login,
      children: [
        {
          path: '/',
          component: LoginForm
        }
      ]
    },
    {
      path: '/register',
      component: Register,
      children: [
        {
          path: '',
          redirect: 'form'
        },
        {
          path: 'form',
          component: RegisterForm
        },
        {
          path: 'success',
          component: RegisterSuccess
        }
      ]
    },
    {
      path: '/forgetpwd',
      component: ForgetPwd,
      children: [
        {
          path: '/',
          component: ForgetPwdForm
        }
      ]
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'new'
        },
        {
          path: 'new',
          component: New
        },
        {
          path: 'mine',
          component: Mine
        },
        {
          path: 'profile',
          component: Profile,
          children: [
            {
              path: '/',
              component: ProfileForm,
            }
          ]
        }
      ]
    },
  ]
})
