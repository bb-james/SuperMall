<!--  -->
<template>
<div class='logininner'>
    <section class="">
        <h2 class="title">美丽说</h2>
        <div class="login-line">         
            <a href="javascript:;" :class="{'border-active':isActive}" @click="switchClick">短信登陆</a>
            <a href="javascript:;" :class="{'border-active':!isActive}" @click="switchClick">密码登陆</a>
        </div>
         <form >
           <div :class="{'on':!isActive}">
             <section class="input-content">
                <input type="tel" :class="{'border-blur':rules[1].Phone.isBlur}" maxlength="11" placeholder="绑定手机号码" 
                      v-model="phone"  @blur="CheckPhone(phone,11)"     
                      ref="phone"> 
              <p class="errMassage" >{{phoneMass}}</p>   
              <button :disabled="!rightPhone" class="sure-code" :class="{'showbutton':rightPhone}"@click.prevent="getcode">
              {{computedTime > 0 ? `已发送(${computedTime}s)`:'获取验证码'}}              
              </button>
             </section>
             
             <div>
              <section class="input-content">
               <input type="tel" maxlength="8" placeholder="验证码" v-model="captcha" >
             </section></div> 
           </div>
           <div :class="{'on':isActive}">
             <!-- <section class="input-content">
               <input type="tel" :class="{'border-blur':rules[0].Phone.isBlur}" maxlength="11" placeholder="绑定手机号码" 
                      v-model="phone"  @blur="CheckPhone(phone,11)"     
                      ref="phone"> 
              <p class="errMassage" >{{phoneMass}}</p>             
             </section> -->
             <section class="input-content">              
               <input type="text" :class="{'border-blur': rules[0].User.isBlur}" maxlength="6" placeholder="用户名账号"
                      v-model="user_name"  @blur="CheckUser(user_name,11)"     
                     ref="user"> 
               <p class="errMassage" >{{user_nameMass}}</p>
                                                    
             </section>
             
             <div>
              <section class="input-content">
               <input type="pass" :class="{'border-blur': rules[0].Pass.isBlur}" minlength="8" placeholder="密码" 
                      v-model="password"  @blur="CheckPass(password,11)"     
                      ref='password'> 
               <p class="errMassage" >{{passMass}}</p>   
             </section></div>
             <div>
              <section class="input-content">
               <input type="text" :class="{'border-blur': rules[0].Captcha.isBlur}" maxlength="4" minlength='4' placeholder="验证码" 
                      v-model="captcha"  @blur=" CheckCaptcha(captcha)"    
                      ref='password'> 
               <p class="errMassage" >{{captchaMass}}</p> 
               <div>
                 <img  class='size-cap' ref='captcha' src="http://localhost:3000/captcha" alt="换一下" @click.prevent=SwitchCaptcha()> 
               </div>
                 
             </section></div>                  
           </div>  
          <button class="submit-button" @click.prevent="submitLogin(user_name)">登陆</button>
          <a href="javascript:" class="about-us">关于我们</a>        
         </form>
    </section>
   
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { reqpwdlogin} from '@/network/loguser.js'
import ajax from '../../../network/ajax';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
  isActive: true,
  phone: '',
  password:'',
  captcha: '',
  computedTime: 0,
  user_name: '',
  phoneMass: '',
  user_nameMass: '',
  captchaMass:'',
  passMass: '',
  rules:[{   
           User:{ massage: ['请输入昵称','不能超过6位数'], isBlur: false, requires: false},
           Pass: {massage: ['请输入密码','不能超过6位数'], isBlur: false, requires: false},
           Captcha:{massage:['请输入验证码','验证码错误'], isBlur: false, requires: false}
           },
           {Phone:{ massage: ['请输入手机号码','请输入正确的手机号码'], isBlur: false, requires: false},}
           ]
  }
},
//监听属性 类似于data概念
computed: {
  //正确的手机号码
  rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    },
 
  
},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  switchClick() {
    if(this.isActive) return this.isActive = false
    if(!this.isActive) return this.isActive = true
  },
   getcode() {
    if(!this.computedTime) {
      // 启动倒计时
      this.computedTime= 30
      this.intervalId = setInterval(() => {
        this.computedTime--
        // 停止计时
        if(this.computedTime<=0) clearInterval(this.intervalId)  
          }, 1000);
        }
     
  }, 
    //检查验证码
     CheckCaptcha(cap){
      this.rules[0].Captcha.isBlur = true
      this.rules[0].Captcha.requires = false
      if(!cap) {
        this.captchaMass = this.rules[0].Captcha.massage[0]
      }else{
      this.captchaMass=''
      this.rules[0].Captcha.requires = true
      this.rules[0].Captcha.isBlur = false
      }
      

    },//检测绑定电话号码内容
     CheckPhone(val,Length) {
       
        this.rules[1].Phone.isBlur = true
        this.rules[1].Phone.requires = false
         if (!val) {
           this.phoneMass = this.rules[1].Phone.massage[0] 
        }else if(val&&val.length<Length) {
           this.phoneMass = this.rules[1].Phone.massage[1]  
        }else {
          this.rules[1].Phone.isBlur = false
          this.phoneMass = ''
           this.rules[1].Phone.requires = true
        }  
    },//检查用户账号
      CheckUser(val,Length) {
        this.rules[0].User.isBlur = true
        this.rules[0].User.requires = false
         if (!val) {
           this.user_nameMass = this.rules[0].User.massage[0]                   
        }else if(val&&val.length>Length) {
           this.user_nameMass = this.rules[0].User.massage[1]  
        }else {
          this.rules[0].User.isBlur = false
          this.user_nameMass = ''
            this.rules[0].User.requires = true
        }  
    },
    //检查密码
      CheckPass(val,Length) {
        this.rules[0].Pass.isBlur = true
        //requires为true，则填写内容正确
        this.rules[0].Pass.requires = false
         if (!val) {
           this.passMass = this.rules[0].Pass.massage[0]                   
        }else if(val&&val.length>Length) {
           this.passMass = this.rules[0].Pass.massage[1]  
        }else {
         this.rules[0].Pass.isBlur = false
          this.passMass = ''
          this.rules[0].Pass.requires = true
          
        }  
    },
    //登陆
    submitLogin(id) { 
      const rule = this.rules[0]
      //输入框的数量
      const Length = Object.keys(rule).length 
      const Requires = Object.keys(rule).filter(key =>{
      //筛选出正确填写的输入框数组 requires:true
         return rule[key].requires ===true 
        
      })
      if(Requires.length < Length){
       
       // 检查所有输入框信息是否正确
      }else if (Requires.length===Length) {  
        const {password,user_name,captcha} = this 
      let data
        //密码登陆
       data = reqpwdlogin({password,user_name,captcha})   
       data.then((result)=>{
       
        //如果code=0,则登陆成功，储存用户信息
          if(result.code==0) {
          this.$store.dispatch('GetLoginUser',result)
          
          this.$router.push('/profile') 
          
          }
         //如果code=1,则登陆失败
         if(result.code==1) {
           this.captchaMass = result.msg
           //输入框变为红色
           this.rules[0].Captcha.isBlur = true
           this.rules[0].Captcha.requires = false
           MessageBox.alert('请输入正确信息')
           //图片刷新
           this.SwitchCaptcha()
           return
         }
      })
        //转到首页 
        
      }
    },
          // 点击更换验证图片
       SwitchCaptcha() {
         this.$refs.captcha.src=`http://localhost:3000/captcha?time=${Date.now()}`
       }
      
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {
    
},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
  .logininner {
    width: 80%;
    margin: 0 auto;
    padding-top: 60px;
    background: #fff;
  }
  .title {
    font-size: 40px;
    font-weight: bold;
    color: #ff0066;
    text-align: center;
    
  }
  .login-line {
    text-align: center;
    padding-top: 40px;
  }
  .login-line a {
    margin: 0 20px;
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 5px;
  }
  .border-active {
    border-bottom: 3px solid #ff0066;   
  }
  .input-content {
    position: relative;
    margin-top: 20px;
    height: 48px;
    background-color: #fff;
  }
  .input-content input {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    outline: 0;
    padding-left: 10px;
    font-size: 16px;
    border-radius: 4px;
    font: 400 14px Arial; 
  }
  .input-content input:focus {
    border-color: red;
  }
  .sure-code {
    background: transparent;
    color: #ccc;
    position: absolute;
    right: 0;
    font: 400 14px Arial; 
    top: 50%;
    transform: translateY(-50%);
    border: none;
    outline:none;
  }
  .showbutton {
    color: #000 !important ;
  }
  .on {
    display: none;
  }
  .errMassage {
    position: absolute;
    font-size: 12px;
    color:#f56c6c;
    bottom: 0;
    transform: translateY(125%)  
  }
  .border-blur {
     border-color :red !important;
  }
  .submit-button {
    width: 100%;
    height: 45px;
    border: 0;
    outline: none;
    background:#f56c6c; 
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border-radius: 4px;
    margin-top: 30px;
  }
  .about-us {
    display: block;
    text-align: center;
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }
  .size-cap {
    height:48px;
    position:absolute;
    top:0;
    right:0;
  }
  
</style>