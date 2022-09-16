<template>
    <div>
        <div class="login_box">
            <i class="el-icon-close close_btn" @click="closeLogin"></i>
            <div class="by_QR" v-show="loginType == 1">
                <div class="top_area">
                    <span class="tips">扫码登录</span>
                </div>
                <div class="mid_area">
                    <div class="left_area">
                        <img src="@/assets/loginTip.png" alt="">
                    </div>
                    <div class="right_area">
                        <div class="QR_code" v-if="this.QRCodeUrl" :style="{ backgroundImage: 'url(' + this.QRCodeUrl + ')' }">
                            <div class="error_tip" :style="{ display: !isOverdue ? 'none' : 'block' }">
                                <div class="error_text">二维码已失效</div>
                                <el-button size="mini" class="error_btn" @click="getQRCode">点击刷新</el-button>
                            </div>
                        </div>
                        <div>
                            <span>使用</span>
                            <span style="color: rgb(12, 115, 194);">网易云音乐APP</span>
                            <span>扫码登录</span>
                        </div>
                    </div>
                </div>
                <div class="bottom_area">
                    <span class="other" @click="changeLoginType(2)">选择其他登录模式></span>
                </div>
            </div>
            <div class="by_other" v-show="loginType == 2">
                <div class="first_row">
                    <img v-show="!isForget" src="@/assets/loginByQR.png" class="to_QR" alt=""
                        @click="changeLoginType(1)">
                    <span v-show="!isForget" class="tip" @click="changeLoginType(1)">扫码登录更安全</span>
                    <el-button v-show="isForget" type="text" class="back_login" @click="backToLogin">&lt 返回登录
                    </el-button>
                </div>
                <div class="second_row">
                    <img src="@/assets/loginLogo.png" alt="">
                </div>
                <div class="third_row">
                    <div v-show="isNext"
                        style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                        <div class="next_tip">为了安全，我们将向您的手机发送校验码</div>
                        <div class="next_box">
                            <el-input v-model="verification" placeholder="填写验证码" class="input_box">
                                <svg slot="prefix" t="1659712803932" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="9010" width="16" height="16">
                                    <path
                                        d="M544 269h124c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H544v116a32.5 32.5 0 0 1-0.056 1.916C670.218 466.412 768 574.037 768 704.5 768 845.609 653.609 960 512.5 960 371.391 960 257 845.609 257 704.5c0-130.12 97.27-237.523 223.064-253.46A32.488 32.488 0 0 1 480 449V96c0-17.673 14.327-32 32-32 17.673 0 32 14.327 32 32v45h192c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H544v64z m-31.5 627C618.263 896 704 810.263 704 704.5S618.263 513 512.5 513 321 598.737 321 704.5 406.737 896 512.5 896z"
                                        p-id="9011" fill="#000000"></path>
                                </svg>
                            </el-input>
                            <div class="count_box" @click="resendVerification"
                                :style="{ backgroundColor: count > 0 ? 'rgb(222, 222, 222)' : 'rgb(255, 58, 58)', color: count > 0 ? 'rgb(153, 153, 153)' : '#fff', cursor: count > 0 ? 'unset' : 'pointer' }">
                                {{ count }}</div>
                        </div>
                        <el-button class="finish" @click="finish">完成</el-button>
                    </div>
                    <div v-show="!isNext" style="display: flex; flex-direction: column; align-items: center;">

                        <el-input v-model="phoneNumber" placeholder="请输入手机号" class="input_phone" @focus="clearError">
                            <svg slot="prefix" t="1659709883705" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="2294" width="16" height="16">
                                <path
                                    d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"
                                    p-id="2295" fill="#000000"></path>
                                <path
                                    d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"
                                    p-id="2296" fill="#000000"></path>
                            </svg>
                        </el-input>
                        <el-input type="password" v-model="passWord" :placeholder="isForget ? '设置登录密码' : '请输入密码'"
                            v-show="byPassword" @focus="clearError">
                            <svg slot="prefix" t="1659710171758" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="3295" width="16" height="16">
                                <path
                                    d="M508.765329 548.912701c-45.568848 0-82.642209 37.07336-82.642209 82.643232 0 18.119683 5.760191 35.320437 16.660448 49.740868 0.233314 0.309038 0.475837 0.60989 0.727571 0.903579 20.418029 23.793916 21.900799 40.779775 21.995967 42.336224l0 47.197952c0 23.853267 19.405979 43.258223 43.259246 43.258223 23.854291 0 43.259246-19.405979 43.259246-43.258223l0-48.088228c0-0.540306-0.022513-1.081635-0.069585-1.61887-0.004093-0.041956 0.10847-0.010233 0.112564-0.051165 0.118704-1.083681 0.481977-3.40147 1.586125-6.759961 2.219551-6.750751 7.442506-17.812691 19.729344-32.177863 0.178055-0.207731 0.350994-0.419556 0.51984-0.635473 11.453866-14.646582 17.508769-32.229029 17.508769-50.846038C591.411631 585.987085 554.337247 548.912701 508.765329 548.912701zM544.67212 659.078777c-28.900214 33.943067-30.3134 58.252729-30.039153 65.054645l0 47.602158c0 3.234671-2.631944 5.865591-5.866614 5.865591s-5.865591-2.63092-5.865591-5.865591l0-47.423079c0.002047-3.491521-0.960885-31.193443-30.592762-65.973574-5.753027-7.791453-8.791224-17.040095-8.791224-26.782993 0-24.951275 20.299325-45.2506 45.249577-45.2506 24.953322 0 45.254693 20.299325 45.254693 45.2506C554.018999 641.621173 550.788421 651.128711 544.67212 659.078777z"
                                    p-id="3296" fill="#000000"></path>
                                <path
                                    d="M822.680878 390.411781l-45.819558 0L776.86132 270.363637c0-0.793062-0.050142-1.586125-0.150426-2.37407-8.16496-63.780629-39.282678-122.508171-87.62264-165.366282-48.76361-43.233664-111.545492-67.042929-176.778192-67.042929-71.203692 0-138.146337 27.728528-188.494025 78.076216-50.349735 50.348712-78.07724 117.291356-78.07724 188.496072l0 88.22946-50.883901 0.029676c-35.176151 0-63.792908 28.617781-63.792908 63.792908l0 452.057793c0 35.175127 28.616758 63.791885 63.792908 63.791885l389.759935 0c0.567935 0 1.12973-0.024559 1.684362-0.074701l234.697323 0c0.555655 0.050142 1.11745 0.074701 1.684362 0.074701 35.175127 0 63.791885-28.616758 63.791885-63.791885L886.472763 454.204689C886.472763 419.029562 857.856006 390.411781 822.680878 390.411781zM849.080132 906.262482c0 13.886265-10.778484 25.303292-24.408923 26.324552-0.051165 0-0.103354 0-0.154519 0L578.913992 932.587034c-0.567935 0-1.12973 0.024559-1.684362 0.074701L194.853873 932.661735c-14.557554 0-26.399253-11.842723-26.399253-26.399253L168.45462 454.204689c0-14.557554 11.842723-26.400277 26.399253-26.400277l69.590961-0.040932c0.952698-0.001023 1.88186-0.095167 2.796696-0.233314 1.003863 0.166799 2.028193 0.275269 3.080152 0.275269l352.928075 0c0.336668 0.007163 0.857531 0.014326 1.547239 0.014326 9.410324 0 50.318012-1.431605 85.968977-24.945135 8.620331-5.685489 10.998495-17.281595 5.313006-25.901926-5.686513-8.620331-17.283642-10.997472-25.901926-5.313006-29.55206 19.491936-65.778122 18.771529-66.081021 18.762319-0.204661-0.007163-0.410346-0.010233-0.617054-0.010233L283.131429 390.411781l0-88.26016c0-61.216223 23.838941-118.767987 67.124793-162.054863 43.285852-43.285852 100.837616-67.12377 162.053839-67.12377 56.08332 0 110.053512 20.466124 151.971204 57.629535 41.277102 36.594453 67.946508 86.618776 75.188446 140.975778l0 136.27471c0 1.673106 0.225127 3.339048 0.667196 4.951779l0.344854 1.254573c2.229784 8.117888 9.610892 13.744026 18.028609 13.744026l64.171532 0c14.556531 0 26.399253 11.842723 26.399253 26.400277L849.081155 906.262482z"
                                    p-id="3297" fill="#000000"></path>
                            </svg>
                        </el-input>
                        <el-input v-model="verification" placeholder="请输入验证码" v-show="!byPassword" @focus="clearError">
                            <svg slot="prefix" t="1659712803932" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="9010" width="16" height="16">
                                <path
                                    d="M544 269h124c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H544v116a32.5 32.5 0 0 1-0.056 1.916C670.218 466.412 768 574.037 768 704.5 768 845.609 653.609 960 512.5 960 371.391 960 257 845.609 257 704.5c0-130.12 97.27-237.523 223.064-253.46A32.488 32.488 0 0 1 480 449V96c0-17.673 14.327-32 32-32 17.673 0 32 14.327 32 32v45h192c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H544v64z m-31.5 627C618.263 896 704 810.263 704 704.5S618.263 513 512.5 513 321 598.737 321 704.5 406.737 896 512.5 896z"
                                    p-id="9011" fill="#000000"></path>
                            </svg>
                            <el-button type="text" slot="suffix" class="get_verification">获取验证码</el-button>
                        </el-input>
                        <div class="info" v-show="!isForget">
                            <el-checkbox v-model="checked">自动登录</el-checkbox>
                            <div>
                                <el-button type="text" class="forget_password" v-show="byPassword"
                                    @click="forgetPassword">忘记密码</el-button>
                                <span class="separate" v-show="byPassword"> | </span>
                                <el-button type="text" class="login_by_message" @click="loginByPassword(false)"
                                    v-show="byPassword">
                                    验证码登录
                                </el-button>
                                <el-button type="text" class="login_by_message" @click="loginByPassword(true)"
                                    v-show="!byPassword">密码登录</el-button>
                            </div>
                        </div>
                        <span ref="loginError" class="login_error"
                            :style="{ color: isForget && !isFlag ? '#999' : '#ec4141', marginTop: isForget ? '10px' : '0' }"></span>
                        <el-button v-show="!isForget" class="login_btn" @click="login">登录</el-button>
                        <el-button v-show="isForget" class="login_btn" @click="next">下一步</el-button>
                        <el-button v-show="!isForget" type="text" class="register_btn">注册</el-button>
                        <div class="check" v-show="!isForget">
                            <span>同意</span>
                            <span class="clause" @click="gotoRead(1)">《服务条款》</span>
                            <span class="clause" @click="gotoRead(2)">《隐私政策》</span>
                            <span class="clause" @click="gotoRead(3)">《儿童隐私政策》</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            QRCodeUrl: '', // 二维码url
            pollingST: null, // 轮询定时器
            key: null, // 二维码key
            isOverdue: false, // 是否已经失效
            loginType: 1, // 登录方式 1.二维码登录 2.账号登录
            countrys: [], // 国家编码列表
            curCountry: 86, // 当前选择的国家
            phoneNumber: undefined, // 手机号
            passWord: undefined, // 密码
            verification: undefined, // 验证码
            checked: false, // 是否自动登录
            byPassword: true, // 通过密码/验证码登录
            isForget: false, // 是否忘记密码
            isFlag: false, // tip/error
            isNext: false, // 是否点击了下一步
            count: 60, // 倒计时
            countInterval: undefined // 倒计时定时器
        }
    },
    created() {
        // 获取二维码
        this.getQRCode()
        // 开启轮询
        this.polling()
    },
    destroyed() {
        // 清除定时器
        clearInterval(this.pollingST)
    },
    watch: {
        count() {
            if (this.count == 0) {
                this.count = '重新获取'
                clearInterval(this.countInterval)
            }
        }
    },
    methods: {
        ...mapMutations(['setloginFlag', 'setloginCardVisible', 'setloginState']),
        // 发送验证码
        sendVerification() {
            axios.get(`/captcha/sent?phone=${this.phoneNumber}`).then(res => {
                if (res.data && res.data.code == 200) {
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 校验验证码
        checkVerification() {
            axios.get(`/captcha/verify?phone=${this.phoneNumber}&captcha=${this.verification}`).then(res => {
                if (res.data && res.data.code == 200) {
                    return true
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 重新发送验证码
        resendVerification() {
            // 如果倒计时还没结束就不能发送验证码
            if (this.count > 0) {
                return
            }
            // 发送验证码
            this.sendVerification()
        },
        // 修改密码
        modifyPassword() {
            axios.get(`/register/cellphone?phone=${this.phoneNumber}&password=${this.passWord}&captcha=${this.verification}&nickname=`).then(res => {
            })
        },
        // 完成
        finish() {
            // 校验验证码
            let isTrue = this.checkVerification()
            if (isTrue) {
                // 修改密码

                // 登录
            }
        },
        // 下一步
        next() {
            if (!this.phoneNumber) {
                this.isFlag = true
                this.$refs.loginError.innerText = '请输入手机号'
                return
            }
            if (!this.passWord) {
                this.isFlag = true
                this.$refs.loginError.innerText = '请输入登录密码'
                return
            }
            if (this.phoneNumber.toString().length != 11) {
                this.isFlag = true
                this.$refs.loginError.innerText = '请输入11位数字的手机号'
                return
            }
            if (this.passWord.toString().length < 8 || this.passWord.toString().length > 20) {
                this.isFlag = true
                this.$refs.loginError.innerText = '请输入8-20位的密码'
                return
            }
            if (!/(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{8,20}$/.test(this.passWord)) {
                this.isFlag = true
                this.$refs.loginError.innerText = '至少包含字母/数字/字符2种组合'
                return
            }
            // 修改表单验证字体颜色
            this.isFlag = false
            // 隐藏某些不需要的dom
            this.isNext = true
            // 启动倒计时定时器
            this.setCountInterval()
            // 发送验证码
            this.sendVerification()
        },
        // 设置倒计时定时器
        setCountInterval() {
            this.countInterval = setInterval(() => {
                this.count = this.count - 1
            }, 1000)
        },
        // 返回登录
        backToLogin() {
            this.isForget = false
            this.$refs.loginError.innerText = ''
        },
        // 忘记密码
        forgetPassword() {
            this.isForget = true
            this.$refs.loginError.innerText = '密码8-20位，至少包含字母/数字/字符2种组合'
        },
        // 清除提示
        clearError() {
            this.isFlag = false
            if (this.isForget) {
                this.$refs.loginError.innerText = '密码8-20位，至少包含字母/数字/字符2种组合'
            } else {
                this.$refs.loginError.innerText = ''
            }
        },
        // 登录
        login() {
            if (!this.phoneNumber) {
                this.$refs.loginError.innerText = '请输入手机号'
                return
            }
            if (!this.passWord && this.byPassword) {
                this.$refs.loginError.innerText = '请输入登录密码'
                return
            }
            if (!this.verification && !this.byPassword) {
                this.$refs.loginError.innerText = '请输入验证码'
                return
            }
            if (this.phoneNumber.toString().length != 11) {
                this.$refs.loginError.innerText = '请输入11位数字的手机号'
                return
            }
        },
        // 通过密码/验证码登录
        loginByPassword(val) {
            this.byPassword = val
        },
        // 前往各条款
        gotoRead(index) {
            if (index == 1) {
                window.open('https://st.music.163.com/official-terms/service')
            } else if (index == 2) {
                window.open('https://st.music.163.com/official-terms/privacy')
            } else if (index == 3) {
                window.open('https://st.music.163.com/official-terms/children')
            }
        },
        // 获取国家编码列表
        getCountrys() {
            axios.get(`/countries/code/list`).then(res => {
                if (res.data && res.data.code == 200) {
                    let country = res.data.data
                    country.forEach(item => {
                        item.countryList.forEach(jtem => {
                            this.countrys.push(jtem)
                        })
                    })
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 更换登录方式
        changeLoginType(value) {
            this.loginType = value
        },
        // 关闭
        closeLogin() {
            this.setloginCardVisible({ val: false })
        },
        // 获取二维码
        getQRCode() {
            // 生成二维码key
            axios.get(`/login/qr/key?timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.code == 200) {
                    this.key = res.data.data.unikey
                    // 生成二维码
                    axios.get(`/login/qr/create?key=${this.key}&qrimg=true&timerstamp=${Date.now()}`).then(res => {
                        if (res.data && res.data.code == 200) {
                            this.QRCodeUrl = res.data.data.qrimg
                        } else {
                            this.$message(res.message || '网络拥挤，请稍后再试')
                        }
                    })
                } else {
                    this.$message(res.message || '网络拥挤，请稍后再试')
                }
            })
        },
        // 判断二维码是否失效
        async checkQRCodeValue() {
            await axios.get(`/login/qr/check?key=${this.key}&timerstamp=${Date.now()}`).then(res => {
                if (res.data) {
                    if (res.data.code == 800) {
                        this.isOverdue = true
                    } else if (res.data.code == 803) {
                        this.getUserLoginState()
                    }
                }
            })
        },
        // 判断用户登录状态
        async getUserLoginState() {
            await axios.get(`/login/status?timerstamp=${Date.now()}`).then(res => {
                if (res.data && res.data.data.code == 200) {
                    console.log(res, '判断用户登录状态')
                    if (res.data.data.profile) {
                        localStorage.setItem('profile', JSON.stringify(res.data.data.profile))
                        this.setloginState({val: res.data.data.profile})
                        this.setloginFlag()
                        this.closeLogin()
                    }
                }
            })
        },
        // 轮询方法
        polling() {
            this.pollingST = setInterval(async () => {
                await this.checkQRCodeValue()
            }, 2000)
        }
    }
}
</script>

<style lang="less" scoped>
@keyframes animation_left {
    0% {
        opacity: 1;
        left: 20px;
    }

    100% {
        left: 50%;
        opacity: 0;
        transform: translateX(-50%);
    }
}

@keyframes animation_left_out {
    0% {
        left: 50%;
        opacity: 0;
        transform: translateX(-50%);
    }

    100% {
        opacity: 1;
        left: 20px;
    }
}

@keyframes animation_right {
    0% {
        right: 20px;
    }

    100% {
        right: 50%;
        top: 20px;
        transform: translateX(50%);
    }
}

@keyframes animation_right_out {
    0% {
        right: 50%;
        top: 20px;
        transform: translateX(50%);
    }

    100% {
        right: 20px;
    }
}

@keyframes animation_code {
    0% {
        width: 160px;
        height: 160px;
    }

    100% {
        width: 180px;
        height: 180px;
    }
}

@keyframes animation_code_out {
    0% {
        width: 180px;
        height: 180px;
    }

    100% {
        width: 160px;
        height: 160px;
    }
}

.login_box {
    width: 350px;
    height: 530px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    background: #fff;
    box-shadow: 4px 4px 10px #909090;
    display: flex;
    flex-direction: column;

    .close_btn {
        font-size: 24px;
        color: #909090;
        padding: 5px;
        position: absolute;
        right: 0;
        cursor: pointer;
    }

    .by_QR {
        .top_area {
            height: 136px;


            .tips {
                font-size: 26px;
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
            }
        }

        .mid_area {
            height: 284px;
            position: relative;

            .left_area {
                position: absolute;
                top: 20px;
                left: 20px;
                animation: animation_left .3s linear;
                animation-fill-mode: forwards;
            }

            .right_area {
                text-align: center;
                position: absolute;
                right: 20px;
                top: 40px;
                font-size: 12px;
                animation: animation_right .3s linear;
                animation-fill-mode: forwards;

                .QR_code {
                    margin-bottom: 10px;
                    background-repeat: no-repeat;
                    /*背景图像不平铺*/
                    background-position: center;
                    /*图片居中显示*/
                    background-size: cover;
                    width: 160px;
                    height: 160px;
                    animation: animation_code .3s linear;
                    animation-fill-mode: forwards;

                    .error_tip {
                        // display: none;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);

                        .error_text {
                            padding-top: 60px;
                            color: #fff;
                            font-size: 14px;
                            padding-bottom: 10px;
                        }

                        .error_btn {
                            background: rgb(12, 115, 194);
                            border-color: rgb(12, 115, 194);
                            color: #fff;
                        }
                    }
                }

                .mask {
                    background: #999;
                }
            }
        }

        .mid_area:hover {
            .left_area {
                animation: animation_left_out .3s linear;
                animation-fill-mode: forwards;
            }

            .right_area {
                animation: animation_right_out .3s linear;
                animation-fill-mode: forwards;

                .QR_code {
                    animation: animation_code_out .3s linear;
                    animation-fill-mode: forwards;
                }
            }
        }

        .bottom_area {
            height: 110px;
            text-align: center;
            font-size: 12px;
            position: relative;

            .other {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                cursor: pointer;
            }
        }
    }

    .by_other {
        .first_row {
            height: 60px;

            .to_QR {
                width: 50px;
                height: 50px;
                position: absolute;
                top: 8px;
                left: 8px;
                cursor: pointer;
            }

            .tip {
                color: #fff;
                background: rgb(153, 153, 153);
                position: absolute;
                left: 55px;
                top: 18px;
                padding: 10px 5px;
                font-size: 12px;
                border-radius: 8px;
                cursor: pointer;
            }

            .back_login {
                padding: 10px;
                color: rgb(102, 102, 102);
            }

            .back_login:hover {
                color: #000;
            }
        }

        .second_row {
            text-align: center;
        }

        .third_row {
            width: 80%;
            margin: 30px 10% 0 10%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .finish {
                width: 100%;
                margin-top: 20px;
                background: #ec4141;
                color: #fff;
                border: unset;
            }

            .next_tip {
                font-size: 12px;
                margin-bottom: 20px;
            }

            .next_box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;

                .input_box {
                    width: 45%;
                }

                .count_box {
                    width: 45%;
                    height: 38px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: rgb(222, 222, 222);
                    color: rgb(153, 153, 153);
                }
            }

            .get_verification {
                color: #999;
                padding-right: 10px;
            }

            .get_verification:hover {
                color: #000;
            }

            .input_phone {
                font-weight: 500;
            }

            .each_country {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }

            .info {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 12px;

                .forget_password {
                    color: #507daf;
                }

                .separate {
                    color: #999;
                }

                .login_by_message {
                    color: #507daf;
                }
            }

            .login_error {
                font-size: 12px;
                height: 20px;
                text-align: left;
                width: 248px;
            }

            .login_tip {
                font-size: 12px;
                height: 20px;
                text-align: left;
                width: 100%;
                color: #999;
            }

            .login_btn {
                width: 80%;
                margin-top: 20px;
                background: #ec4141;
                color: #fff;
                border: unset;
            }

            .login_btn:hover {
                background: rgb(229, 52, 52);
            }

            .register_btn {
                color: #999;
                margin-left: 0;
                text-decoration: underline;
            }

            .register_btn:hover {
                color: #000;
            }

            .check {
                font-size: 12px;
                color: #999;
                margin-top: 80px;

                .clause {
                    color: #507daf;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

<style>
.el-input__prefix {
    display: flex;
    align-items: center;
}

.el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ec4141;
    border-color: #ec4141;
}
</style>