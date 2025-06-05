// messageService.js
import { message } from 'antd';

// 创建一个自定义 Hook
export const useMessageService = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const successMsg = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };

    const errorMsg = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };

    const warningMsg = (content) => {
        messageApi.open({
            type: 'warning',
            content: content,
        });
    };

    return {
        successMsg,
        errorMsg,
        warningMsg,
        contextHolder
    };
};