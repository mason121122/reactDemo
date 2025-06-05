import http from './axios'


export const usersPageQuery = (values) => {
    return http.request({
        url: '/users/pageQuery',
        method: 'get',
        params: {
            username:values.username,
            phone:values.phone,
            pageIndex:values.pageIndex,
            pageSize:values.pageSize
        }
    })
}

export const addUser = (values) => {
    return http.request({
        url: '/users/addUser',
        method: 'POST',
        data: values
    })
}

export const editUser = (values) => {
    return http.request({
        url: '/users/editUser',
        method: 'PUT',
        data: values
    })
}

export const delUser = (id) => {
    return http.request({
        url: '/users/delUser',
        method: 'DELETE',
        params: {
            id
        }
    })
}