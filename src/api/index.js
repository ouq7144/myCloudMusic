import axios from '@/plugins/axios.js'

export default {
    getHotMusic: config => axios({
        url: '/playlist/hot',
        method: 'post'
    }),
    search: config => axios({
        url: '/search'
    })

}