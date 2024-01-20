import React from "react";
import { Login } from "../components/Login";
import "../assets/style/Home.css";
import {Col, Row} from "antd";

export const Home = () => {
    return (
        <div className="home-container">
            <div className="pt-[200px]">
                <Row className="pl-[10.5%]">
                   <Col>
                       <img
                           alt="logo"
                           className="w-[28px] h-[28px]"
                           src="https://cdn2.iconfinder.com/data/icons/pharmacy-57/64/herbal-herbalism-pills-medicine-supplement-512.png"
                       />
                   </Col>
                   <Col className="text-lg text-[#708090] font-bold">DRUGGIES</Col>
                </Row>
                <h1 className="pl-[10.5%] text-4xl font-bold">YOUR <span className="text-red-600">NUMBER 1 TRUSTED</span></h1>
                <h1 className="pl-[10.5%] text-6xl font-bold">PHARMACEUTICAL</h1>
                <h1 className="pl-[10.5%] text-2xl font-bold">INVENTORY MANAGEMENT SYSTEM</h1>
                <Login />
            </div>
        </div>
    );
};