import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, InputNumber, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

type filedType = {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
};

const ProductAdd = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const { mutate } = useMutation({
        mutationFn: async (product: filedType) => {
            try {
                return await axios.post(
                    `http://localhost:3000/products`,
                    product
                );
            } catch (error) {
                throw new Error("Call API failed: " + error);
            }
        },

        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Thêm sản phẩm thành công",
            });
            form.resetFields();
        },

        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
        },
    });

    const onFinish: FormProps["onFinish"] = (values) => {
        mutate(values);
    };

    return (
        <>
            {contextHolder}
            <h1>Thêm sản phẩm</h1>
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
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm",
                        },
                        {
                            min: 5,
                            message: "Tên sản phẩm phải lớn hơn 5 ký tự",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* giá */}
                <Form.Item
                    label="Gía sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm",
                        },
                        {
                            type: "number",
                            min: 0,
                            message: "Giá sản phẩm phải lớn hơn 0",
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                {/* mô tả */}
                <Form.Item
                    label="Mô tả sản phẩm"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả sản phẩm",
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>

                {/* ảnh */}
                <Form.Item
                    label="Ảnh sản phẩm"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập ảnh sản phẩm",
                        },
                    ]}
                >
                    <Input />
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

export default ProductAdd;
