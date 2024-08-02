import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
function App() {
    const routes = useRoutes([
        {
            path: "product",
            element: <ProductList />,
        },
        {
            path: "product/add",
            element: (
                <PrivateRoutes>
                    <ProductAdd />
                </PrivateRoutes>
            ),
        },
        {
            path: "product/edit/:id",
            element: <ProductEdit />,
        },
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <SignIn /> },
    ]);
    return routes;
}

export default App;
