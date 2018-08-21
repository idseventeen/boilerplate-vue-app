export const SET_USER_INFO = 'SET_USER_INFO'

const user = {
  state: {
    token: 'validate token',
    userInfo: {
      name: 'vue admin',
      avatar: 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_family.jpg',
      role: 'admin'
    }
  },

  mutations: {
    [SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo
    }
  },

  actions: {
    setUserInfo({ commit, state }) {
      commit(SET_USER_INFO, {
        name: 'vue admin1',
        avatar: 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_beauty.jpg',
        role: 'guest'
      })
    }
  }
}

export default user
