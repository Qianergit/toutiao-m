<template>
  <div class="my-condainer">
    <div class="header user-info" v-if="user">
    <div class="base-info">
      <div class="user-left">
       
        <van-image
        fit="cover"
        round
       class="avatar"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
       
        <span class="user-name">千千儿的号</span>
      </div>
      <div user-right>
        <van-button size='mini' round>编辑资料</van-button>
      </div>
    </div>
    <div class="data-stats">
      <div class="data-item">
        <span class="count">10</span>
        <span class="text">头条</span>
      </div>
        <div class="data-item">
        <span class="count">10</span>
        <span class="text">头条</span>
      </div>
        <div class="data-item">
        <span class="count">10</span>
        <span class="text">头条</span>
      </div>
        <div class="data-item">
        <span class="count">10</span>
        <span class="text">头条</span>
      </div>
    </div>
   </div>
   <div class="header not-login" v-else>
    <div class="login-btn" @click="$router.push('/login')">
      <img src="~@/assets/mobile.png" alt="" class="mobile-img">
      <span class="text">登录 / 注册</span>
    </div>
   </div>
   
   <!-- 导航 -->
   <van-grid :column-num="2" class="grid-nav" clickable>
  <van-grid-item  class="grid-item">
 <i slot="icon" class="toutiao toutiao-shoucang"></i>
 <span slot='text' class="text">收藏</span>
  </van-grid-item>
  <van-grid-item class="grid-item">
    <i slot="icon" class="toutiao toutiao-lishi"></i>
    <span slot='text' class="text">历史</span>
  </van-grid-item>
</van-grid>
<!-- 索引栏 -->

  <van-cell title="消息通知" is-link />
  <van-cell title="小志同学"  class="xiaozhitongxue" is-link/> 
<van-cell title="退出登录" class="logout-cell" v-if="user" /> 
  </div>
</template>

<script>
import{mapState} from 'vuex'
export default {
name:'myIndex',
methods:{

},
computed:{
    ...mapState(['user'])
}
}

</script>

<style lang='less'>
.my-condainer{
  .header{
    height: 361px;
    background:url("~@/assets/banner.png");
    background-size:cover ;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .mobile-img{
        width:132px;
        height: 132px;
      }
      .text{
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }

  }
  .user-info{
    display: flex;
    flex-direction: column;
    .base-info{
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background: palegoldenrod;
      box-sizing: border-box;
      height: 231px;
      .user-left{
        display: flex;
        align-items: center;
     .avatar{
      margin-right: 23px;
         width: 132px;  
         height: 132px;
         border: 4px solid #fff;
      }
      .user-name{
          font-size: 30px;
          color: #fff;
        }
    }}
    .data-stats{
      height: 130px;
      display: flex;
     .data-item{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
      .count{
font-size: 36px;
 color: #fff;
      }
      .text{
        font-size: 23px;
        color: #fff;
      }
     }
    }
    
  }
  .grid-nav{
    margin-bottom: 10px;
    box-sizing: border-box;
    .grid-item{
      
      height: 140px;
      font-size:28px ;
      .text{
        margin-top: 16px;
      }
      .toutiao{
      font-size: 45px;
    }
    .toutiao-shoucang{
      color: #eb5253;
    }
    .toutiao-lishi{
       color: #ff9d1d;
    }
    }
  }
  .xiaozhitongxue{
    margin-bottom: 10px;
  }
  .logout-cell{
    text-align: center;
    color: #eb5253;
  }
}
</style>