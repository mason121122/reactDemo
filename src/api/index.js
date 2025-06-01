import http from './axios'

export const getData = () => {
  http.request({
    url: '/api/users',
    method: 'get',
    params: {}
  })
}