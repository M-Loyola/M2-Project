import React, {useContext, useState} from "react";
import MenuNav from "../components/MenuNav";
import AddDrug from "../components/AddDrug";
import InventoryTable from "../components/InventoryTable";
import '../assets/style/App.css'
import {Home} from "./Home";
import {MyContext} from "../global/MyProvider";
import {Collapse} from "antd";

export const Dashboard = () => {
    const [hasAdd, setHasAdd] = useState(false)
    const {currentUserLoggedIn} = useContext(MyContext);

    const addDrugCollapseItem = [
        {
            key: '1',
            label: 'ADD DRUG',
            children: <AddDrug defaultStatus={hasAdd} status={(val => setHasAdd(val))}/>
        }
    ];
    const showDashBoard = () => {
        return (
            <>
                <MenuNav />
                <div className="justify-center flex">
                    <Collapse className="w-[1818px]" items={addDrugCollapseItem} defaultActiveKey={['1']} />
                </div>
                <InventoryTable status={hasAdd}/>
            </>
        )
    }

    return (
        <div className="App">
            {
                currentUserLoggedIn !== null ? showDashBoard() : <Home />
            }
        </div>
    );
}
