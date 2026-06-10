export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      token: '',
      user: {},
    }
  },
  actions: {
    //赋值token
    setTokenValue(token) {
      this.token = token // ✅ 更新响应式状态
    },
    //获取个人信息
    async getCurrentInfor() {
      try {
        let { data } = await GetCurrentUserInfo()
        data = await GetImgUrlFn(data, 'pic', 1)
        this.user = data
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
