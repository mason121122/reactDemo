import { Button, Popconfirm, Tag } from "antd";

const getUserColumns = (handleClick, deleteUser) => {
    return [
        {
            title: "租户",
            dataIndex: "tenantId",
        },
        {
            title: "用户名",
            dataIndex: "username",
        },
        {
            title: "真实姓名",
            dataIndex: "realName",
        },
        {
            title: "头像",
            dataIndex: "avatar",
        },
        {
            title: "邮箱",
            dataIndex: "email",
        },
        {
            title: "手机号",
            dataIndex: "phone",
        },
        {
            title: "状态",
            dataIndex: "status",
            render: (_, { status }) => {
                // 将 status 转换为字符串进行比较（根据你的实际需求调整）
                const statusStr = String(status);
                let color;
                let displayText;

                switch (statusStr) {
                    case "1":
                        color = "geekblue";
                        displayText = "正常";
                        break;
                    case "0":
                        color = "volcano";
                        displayText = "禁用";
                        break;
                    default:
                        color = "gray";
                        displayText = "未知状态";
                }

                return (
                    <Tag color={color}>
                        {displayText.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: "操作",
            render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button
                            style={{ marginRight: "5px" }}
                            onClick={() => handleClick("edit", rowData)}
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            title="确认删除"
                            description="是否确认删除?"
                            onConfirm={() => deleteUser(rowData)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button danger>
                                删除
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
};

export default getUserColumns;