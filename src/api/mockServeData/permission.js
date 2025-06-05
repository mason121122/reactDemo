import Mock from 'mockjs'

export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)
        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [

                        {
                            path: '/home',
                            name: 'home',
                            label: '店铺概况',
                            icon: 'HomeOutlined',
                            url: '/home/index'
                        },
                        {
                            path: '/mail',
                            name: 'mail',
                            label: '商品管理',
                            icon: 'ShopOutlined',
                            url: '/mail/index'
                        },
                        {
                            path: '/system',
                            name: 'user',
                            label: '用户管理',
                            icon: 'UserOutlined',
                            url: '/user/index'
                        },
                        {
                            path: '/reception',
                            name: 'reception',
                            label: '接待管理',
                            icon: 'SettingOutlined',
                            children: [
                                {
                                    path: '/reception/pageOne/index',
                                    name: 'receptionPageOne',
                                    label: 'reception页面1',
                                    icon: '',
                                    url: '/reception/pageOne/index',
                                },
                                {
                                    path: '/reception/pageTwo/index',
                                    name: 'receptionPageTwo',
                                    label: 'reception页面2',
                                    icon: '',
                                    url: '/reception/pageTwo/index',
                                }
                            ]
                        },
                        {
                            path: '/inventory',
                            name: 'inventory',
                            label: '库存管理',
                            icon: 'SettingOutlined',
                            children: [
                                {
                                    path: '/inventory/pageOne',
                                    name: 'inventoryPageOne',
                                    label: '页面1',
                                    icon: 'SettingOutlined',
                                    url: '/inventory/pageOne',
                                },
                                {
                                    path: '/inventory/pageTwo',
                                    name: 'inventoryPageTwo',
                                    label: '页面2',
                                    icon: 'SettingOutlined',
                                    url: '/inventory/pageTwo',
                                }
                            ]
                        }
                    ],
                    token:Mock.Random.guid(),
                    message:'成功'
                }
            }
        }

    }
}