<template>
  <div class="login-container">
    <!-- //登录页面 -->
  <van-nav-bar
 class="page-nav-bar"
  title="登陆"
>
 <template #left>
    <van-icon name="cross" size="18" @click="$router.back()"  />
  </template>
</van-nav-bar>
<!-- 表单部分 -->

  <!-- //输入手机号 -->
<van-form ref="loginForm" @submit="onSubmits" >
  
    <van-field
    
      v-model="user.mobile"
      name="mobile"
      type="number"
      maxlength="11"
      placeholder="请输入手机号码"
      :rules="userFormRules.mobile"
     
    > <i slot="left-icon" class="toutiao toutiao-shouji" style="{.van-field i:true}"></i>
    </van-field>
    <van-field
      v-model="user.code"
      type="number"
      name="code"
      placeholder="请输入验证码"
      maxlength="6"
     :rules="userFormRules.code"
    >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma" ></i>
    <!-- 获取验证码按钮 -->
    <template #button  >
      <!-- 倒计时按钮 -->
      <van-count-down           
       :time="1000 * 5" 
       format='ss s'
       v-if="isCountDown"
       @finish='isCountDown=false'
       />
       <!-- 验证码按钮 -->
         
    <van-button 
    v-else
    size="small"
    type="default"
    class="send-sms-btn" 
    round
    @click="onSendSms"
    native-type="button"
    >获取验证码</van-button>
    <!-- type 这句是管颜色的 -->
  </template>
    </van-field>
  
  <div class="login-btn-warp">
    <van-button class="login-btn"  block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>

  </div>

</template>

<script>
import {loginAPI,sendSmsAPI} from '@/Api/index'
export default {
name:'LoginPage',
components:{},
props:{},
data(){
  return{
       user: {
        mobile:'13911111111', // 手机号
        code:'246810' // 验证码
      },
     userFormRules:{
      mobile:[
       { required:true,
        message:'手机号不能为空'
       },
       {
        pattern:/^1[3|5|8|7]\d{9}$/,
        message:'手机号格式错误'
       }
      ],
      code:[
        {
          required:true,
          message:'验证码不能为空'
          
        },
        {
          pattern:/^\d{6}$/,
          message:'验证码格式错误'
        }
      ] 
     },
     isCountDown:false
  }
},
computed:{},
watch:{},
created(){},
mounted(){
 this.$refs.loginForm.validate();
},
methods:{
  async onSubmits(){
   /*   this.$router.push({
    path:'mine'
   }) */
     this.$toast.loading({
  message: '登陆中...',
  forbidClick: true,
  duration:0
        })
        //成功后
   try{
   const {data}= await loginAPI(this.user)
   
   this.$store.commit('setUser',data.data)
   this.$toast.success('登陆成功')
   this.$router.back()
   console.log(data)
   }catch(err){
    if(err.response.status===400){
      this.$toast.fail('手机号或验证码错误')
    }else {
         this.$toast.fail('登陆失败')
    }
      
   }

  },
  async onSendSms(){
       try{
         await this.$refs.loginForm.validate('mobile')
       }
       catch(err){
       return console.log('验证失败',err)
       }
       //验证成功开始倒计时
       this.isCountDown=true
       //请求发送验证码

       try{
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
       }catch(err){
        console.log(err)
        //验证码发送失败停止倒计时
        this.isCountDown=false
        if(err.response.status===429){
          this.$toast('验证太频繁，请稍后再试')
        }else{
          this.$toast('发送失败')
        }
       }
  }
}
}
</script>

<style lang="less">
.login-container{
  .toutiao{
    font-size: 37px;
    color: #666666;
  }
}
.login-btn-warp{
   padding: 53px 33px;
  .login-btn {
      background-color: #6db4fb;
      border: none;
    }
}

.send-sms-btn{
  width: 152px;
	height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: none;
 
}
.toutiao-guanbi{
        color: #fff;
      }

</style>