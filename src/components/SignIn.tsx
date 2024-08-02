/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

type filedType = {
    email?: string;
    password?: string;
};

const SignIn = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: async (user: any) => {
            try {
                const { data } = await axios.post(
                    `http://localhost:3000/signin`,
                    user
                );
                sessionStorage.setItem("user", JSON.stringify(data));
                return data;
            } catch (error) {
                messageApi.error((error as any).response.data);
            }
        },
        onSuccess: async () => {
            form.resetFields();
            await messageApi.success("Đăng nhập thành công");
            navigate("/product");
        },
    });

    const onFinish: FormProps["onFinish"] = (values) => {
        mutate(values);
    };

    return (
        <>
            {contextHolder}
            <h1>Đăng ký</h1>
            <Button type="primary">
                <Link to={"/product"}>Quay về trang sản phẩm</Link>
            </Button>

            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
            >
                {/* tên */}
                <Form.Item<filedType>
                    label="Tên sản phẩm"
                    name="email"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập Email",
                        },
                        {
                            type: "email",
                            message: "Email không hợp lệ",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* giá */}
                <Form.Item<filedType>
                    label="Gía sản phẩm"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignIn;
