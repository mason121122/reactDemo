import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Table, Tag, Popconfirm, Modal, InputNumber, message } from "antd";
import './user.css';
import { addUser, delUser, editUser, usersPageQuery } from "../../../api";
import UserEditModal from "./UserEditModal";
import getUserColumns from "./userColumns";
import UserSearchForm from "./UserSearchForm";
import { useMessageService } from "../../../message";

const Index = () => {
    const { successMsg, errorMsg, warningMsg, contextHolder } = useMessageService();
    const formRef = useRef(null);

    // 初始请求参数
    const INITIAL_PARAMS = {
        username: '',
        phone: '',
        pageIndex: 1,
        pageSize: 10,
    };

    // 请求参数状态
    const [listData, setListData] = useState(INITIAL_PARAMS);
    // 新增和编辑状态: 0 新增、1 编辑
    const [modalType, setModalType] = useState(0);
    // 是否打开弹窗状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 请求返回的表格数据状态
    const [tableData, setTableData] = useState([]);
    // 分页状态
    const [pagination, setPagination] = useState({
        current: INITIAL_PARAMS.pageIndex,
        pageSize: INITIAL_PARAMS.pageSize,
        total: 0,
    });
    // 编辑时的初始值
    const [initialValues, setInitialValues] = useState({});
    // 加载状态
    const [loading, setLoading] = useState(false);

    // 新增、编辑点击事件处理函数
    const handleClick = (type, rowData = {}) => {
        setIsModalOpen(true);
        setModalType(type === 'add' ? 0 : 1);
        if (type === 'edit') {
            setInitialValues(rowData);
            const statusMap = {
                '1': '正常',
                '0': '禁用'
            };
            const newInitialValues = {
                ...rowData,
                status: statusMap[rowData.status] || rowData.status
            };
            setInitialValues(newInitialValues);
        } else {
            setInitialValues({});
            formRef.current?.resetFields();
        }
    };

    // 搜索处理函数
    const handleSearch = (values) => {
        const newListData = { ...listData, ...values, pageIndex: 1 };
        setListData(newListData);
    };

    // 重置按钮逻辑
    const resetSearch = () => {
        setListData(INITIAL_PARAMS);
    };

    // 删除用户处理函数
    const deleteUser = async (rowData) => {
        try {
            await asyDelUser(rowData.id);
            await getTableData({ ...listData, pageIndex: 1 });
        } catch (error) {
            console.error('删除用户失败:', error);
        }
    };

    // 弹窗确定处理函数
    const handleOk = async (values) => {
        const statusMap = {
            '正常': '1',
            '禁用': '0'
        };
        const newValues = {
            ...values,
            status: statusMap[values.status] || values.status
        };
        try {
            if (modalType === 0) {
                await addUserTab(newValues);
            } else {
                await editUserTab({ ...newValues, id: initialValues.id, version: initialValues.version });
            }
            await getTableData({ ...listData, pageIndex: 1 });
            setIsModalOpen(false);
        } catch (error) {
            console.error('保存用户失败:', error);
        }
    };

    // 弹窗取消处理函数
    const handleCancel = () => {
        setIsModalOpen(false);
        formRef.current?.resetFields();
    };

    // 异步删除用户函数
    const asyDelUser = async (id) => {
        try {
            const response = await delUser(id);
            if (response.status === 200) {
                successMsg('删除成功');
            } else {
                errorMsg(response.message || '删除失败');
                throw new Error(response.message || '删除失败');
            }
        } catch (error) {
            errorMsg(error.message || '删除失败');
            throw error;
        }
    };

    // 异步新增用户函数
    const addUserTab = async (values) => {
        try {
            const response = await addUser(values);
            if (response.status === 200) {
                successMsg('新增成功');
            } else {
                errorMsg(response.message || '新增失败');
                throw new Error(response.message || '新增失败');
            }
        } catch (error) {
            errorMsg(error.message || '新增失败');
            throw error;
        }
    };

    // 异步编辑用户函数
    const editUserTab = async (values) => {
        try {
            const response = await editUser(values);
            if (response.status === 200) {
                successMsg('编辑成功');
            } else {
                errorMsg(response.message || '编辑失败');
                throw new Error(response.message || '编辑失败');
            }
        } catch (error) {
            errorMsg(error.message || '编辑失败');
            throw error;
        }
    };

    // 获取表格数据函数
    const getTableData = async (values) => {
        setLoading(true);
        try {
            const response = await usersPageQuery(values);
            if (response.status === 200 && response.data) {
                setTableData(response.data.list || []);
                setPagination({
                    ...pagination,
                    current: values.pageIndex,
                    total: response.data.total || 0,
                });
            } else {
                errorMsg(response.message || '获取数据失败');
                setTableData([]);
            }
        } catch (error) {
            console.error('获取用户列表失败:', error);
            errorMsg(error.message || '获取数据失败');
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    // 分页变化处理函数
    const handleTableChange = (newPagination) => {
        const newListData = {
            ...listData,
            pageIndex: newPagination.current,
            pageSize: newPagination.pageSize,
        };
        setListData(newListData);
    };

    // 监听 listData 变化，更新表格数据
    useEffect(() => {
        getTableData(listData);
    }, [listData]);

    // 获取表格列配置
    const columns = getUserColumns(handleClick, deleteUser);

    return (
        <>
            {contextHolder}
            <div>
                <div className='user'>
                    <div className='flex-box space-between'>
                        <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                        <UserSearchForm onSearch={handleSearch} onReset={resetSearch} />
                    </div>
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        rowKey={'id'}
                        pagination={pagination}
                        onChange={handleTableChange}
                        loading={loading}
                    />
                    <UserEditModal
                        key={`${modalType}-${JSON.stringify(initialValues)}`}
                        ref={formRef}
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        modalType={modalType}
                        initialValues={initialValues}
                    />
                </div>
            </div>
        </>
    );
};

export default Index;