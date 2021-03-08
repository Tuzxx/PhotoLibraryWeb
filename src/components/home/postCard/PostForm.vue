<template>
  <div>
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Text"
      >
        <a-input
          v-decorator="['content']"
          placeholder="Please input your text"
          @blur="contentWrite"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Image"
      >
      <up-img ref="postFormImg"></up-img>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import upImg from './UpLoadImg'

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
  };
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };
  export default {
    name: 'postForm',
    data() {
      return {
        formItemLayout,
        formTailLayout,
        form: this.$form.createForm(this, { name: 'dynamic_rule' }),
        postCard: {
          uid: '',
          username: '',
          avatarUrl: '',
          content: '',
          imgUrl: '',
          likee: 0,
        }
      };
    },
    methods: {
      contentWrite() {
        this.form.validateFields((err, values) => {
          if(!err) {
            this.postCard.content = values.content
          }
        });
      }
    },
    components: {
      upImg
    }
  };
</script>