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
                <input type="tel" :class="{'border-blur':rules[0].Phone.isBlur}" maxlength="11" placeholder="手机号" 
                      v-model="phone"  @blur="CheckPhone(phone,11)"     
                      ref="phone"> 
              <p class="errMassage" >{{phoneMass}}</p>   
              <button :disabled="!rightPhone" class="sure-code" :class="{'showbutton':rightPhone}"@click.prevent="getcode">
              {{computedTime > 0 ? `已发送(${computedTime}s)`:'获取验证码'}}              
              </button>
             </section>
             
             <div>
              <section class="input-content">
               <input type="tel" maxlength="8" placeholder="验证码" v-model="code" >
             </section></div> 
           </div>
           <div :class="{'on':isActive}">
             <section class="input-content">
               <input type="tel" :class="{'border-blur':rules[0].Phone.isBlur}" maxlength="11" placeholder="手机号" 
                      v-model="phone"  @blur="CheckPhone(phone,11)"     
                      ref="phone"> 
              <p class="errMassage" >{{phoneMass}}</p>             
             </section>
             <section class="input-content">              
               <input type="text" :class="{'border-blur': rules[0].User.isBlur}" maxlength="6" placeholder="昵称" 
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
           </div>  
          <button class="submit-button" @click.prevent="submitLogin(user_name)">登陆</button>
          <a href="javascript:" class="about-us">关于我们</a>        
         </form>
    </section>
   
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
return {
  isActive: true,
  phone: '',
  password:'',
  code: '',
  computedTime: 0,
  user_name: '',
  phoneMass: '',
  user_nameMass: '',
  passMass: '',
  rules:[{ Phone:{ massage: ['请输入手机号码','请输入正确的手机号码'], isBlur: false, requires: false},
           User:{ massage: ['请输入昵称','不能超过6位数'], isBlur: false, requires: false},
           Pass: {massage: ['请输入密码','不能超过6位数'], isBlur: false, requires: false}
           }]
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
     CheckPhone(val,Length) {
        this.rules[0].Phone.isBlur = true
        this.rules[0].Phone.requires = false
         if (!val) {
           this.phoneMass = this.rules[0].Phone.massage[0] 
        }else if(val&&val.length<Length) {
           this.phoneMass = this.rules[0].Phone.massage[1]  
        }else {
          this.rules[0].Phone.isBlur = false
          this.phoneMass = ''
           this.rules[0].Phone.requires = true
        }  
    },
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
      CheckPass(val,Length) {
        this.rules[0].Pass.isBlur = true
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
    submitLogin(id) { //提交登陆
      this.$store.dispatch('GetLoginid',id)
      const rule = this.rules[0]
      const Length = Object.keys(rule).length //输入框的数量
      const Requires = Object.keys(rule).filter(key =>{
         return rule[key].requires ===true //筛选出正确填写的输入框数组 requires:true
        
      })
      if(Requires.length < Length){
       MessageBox.alert('请输入正确信息')
      }else if (Requires.length===Length) {  // 所有输入框填写正确才能登陆
        this.$router.push('/home') //转到首页 
      }
      
      
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
  
</style>