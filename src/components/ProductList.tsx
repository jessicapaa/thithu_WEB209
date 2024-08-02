/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../interface/Product";
import { Button, message, Popconfirm, Table } from "antd";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                return await axios.get<IProduct[]>(
                    `http://localhost:3000/products`
                );
            } catch (error) {
                throw new Error("Call API failed: " + error);
            }
        },
    });
    const dataSource = data?.data.map((product: IProduct) => ({
        key: product.id,
        ...product,
    }));

    const { mutate } = useMutation({
        mutationFn: async (id: number | string) => {
            try {
                return await axios.delete(
                    `http://localhost:3000/products/${id}`
                );
            } catch (error) {
                throw new Error("Call API failed: " + error);
            }
        },

        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Xóa sản phẩm thành công",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            messageApi.open({
                type: "error",
                content: error.message,
            });
            throw error;
        },
    });
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
        },
        {
            key: "name",
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            key: "price",
            title: "Gía sản phẩm",
            dataIndex: "price",
        },
        {
            key: "action",
            render: (_: any, product: IProduct) => {
                return (
                    <div className="flex space-x-3">
                        <Popconfirm
                            title="Xóa sản phẩm "
                            description="Bạn có chắc muốn xóa sản phẩm không ?"
                            onConfirm={() => mutate(product.id!)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>

                        <Button>
                            <Link to={`/product/edit/${product.id}`}>Edit</Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <>
            {contextHolder}
            <Table dataSource={dataSource} columns={columns} />
        </>
    );
};

export default ProductList;
