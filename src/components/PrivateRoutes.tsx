import React from "react";

type Props = {
    children: React.ReactNode;
};
const PrivateRoutes = ({ children }: Props) => {
    const user = sessionStorage.getItem("user");
    if (user) {
        return <>{children}</>;
    } else {
        console.log(user);
        return <>Bạn không có quyền truy cập</>;
    }
};

export default PrivateRoutes;
