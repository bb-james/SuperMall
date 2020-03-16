import ajax from '@/network/ajax.js'


export const reqpwdlogin = ({password,user_name,captcha}) =>ajax('/login_pwd',{password,user_name,captcha},'POST') 