import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './app/store';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {Home} from "./pages/Home";
import {Dashboard} from "./pages/Dashboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: <ErrorPage />
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/dashboardPage",
                index: true,
                element: <Dashboard />
            }
        ]
    }
])

root.render(
  <React.StrictMode>
    <Provider store = {store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
