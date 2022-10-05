<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    :disabled="!message.length"
      class="post-btn"
      @click="postcomments"
    >发布</van-button>
  </div>
</template>

<script>
import {postcommentsAPI} from '@/Api'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    comment:{
      type:Object,
    },

    target:{
       type:[Number,String,Object],
       required:true
    },
     commentcontent:{
      type:Boolean,
      default:false
    }
  },
  inject:{
    articleID:{
      type:[String,Number],
      default:null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  watch:{
     commentcontent(){
         this.message=`${this.message}<a style="color:red">${this.comment.aut_name}</a>`
     }
  },
  computed: {
    // commentContent(){
    //   if (this.commentcontent){
    //       return `${this.message}<a style="color:red">${this.comment.aut_name}</a>`
    //   }else{
    //       return this.message
    //   }
    // }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async postcomments(){
      this.$toast.loading({
        message:'发布中',
        forbidClick:true,
        duration:0
      })
         try{
          const { data } = await postcommentsAPI({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleID // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
           })
           console.log(data)
           this.message=''
           this.$toast.success('发布成功')
           this.$emit('commentnewlist',data.data)
         }catch(err){
          this.$toast.fail('发布失败')
            console.log(err)
         }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>