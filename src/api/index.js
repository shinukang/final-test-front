import api from '@/plugins/axiosinterceptor'

const list = async () => {
    const res = await api.get('/board/list')
    return res.data
}

const detail = async (idx) => {
    const res = await api.get(`/board/${idx}`)
    return res.data
}

const register = async (req) => {
    const res = await api.post('/board/reg', req)
    return res.data
}

export default { list, detail, register }