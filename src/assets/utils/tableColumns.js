import {AutoComplete, Space} from "antd";
import React from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ExpiredTag, ExpiringTag, GoodTag} from "./tagComponents";
import '../style/Button.css';

export const inventoryTableColumns = (handleUpdate, handleDelete, showDetails, drugList) => {
    const productNames = drugList.map((item) => item.productName)
    return [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text, record) => {
                return <div onClick={() => showDetails(record)}>{text}</div>;
            },
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
                const reset = () => {
                    setSelectedKeys([]);
                    confirm();
                };
                return (
                    <div style={{padding: 8}}>
                        <AutoComplete
                            style={{width: 188, marginBottom: 8, display: 'block'}}
                            dataSource={productNames}
                            placeholder="Search Product Name"
                            value={selectedKeys[0]}
                            onChange={(value) => setSelectedKeys(value ? [value] : [])}
                            filterOption={(inputValue, option) =>
                                option.value.toLowerCase().includes(inputValue.toLowerCase())
                            }
                            onSelect={confirm}
                        />
                        <button type="button" onClick={reset} style={{width: 90}}>
                            Reset
                        </button>
                    </div>
                );
            },
            onFilter: (value, record) =>
                record.productName.toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => {
                        document.querySelector('.ant-table-filter-dropdown input').focus();
                    }, 0);
                }
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                {
                    text: "Over the counter",
                    value: "Over the counter"
                },
                {
                    text: "Prescription",
                    value: "Prescription"
                }
            ],
            onFilter: (value, record) => record.category === value,
            render: (text, record) => {
                return (
                    <div onClick={() => showDetails(record)}>{text}</div>
                )
            },
        },
        {
            title: 'Quantity On Hand',
            dataIndex: 'quantityOnHand',
            key: 'quantityOnHand',
            render: (text, record) => {
                return (<div onClick={() => showDetails(record)}>{text}</div>)
            }
        },
        {
            title: 'Expiry Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
            width: 300,
            sorter: (a, b) => {
                const aDate = new Date(a.expiryDate);
                const bDate = new Date(b.expiryDate);

                return aDate - bDate;
            },
            render:
                (text, _) => {
                    const currentDate = new Date();
                    const expiryDate = new Date(text);
                    const daysUntilExpiry = Math.floor((expiryDate - currentDate) / (1000 * 60 * 60 * 24));

                    if (daysUntilExpiry > 30) {
                        return <div>{text} <GoodTag/></div>
                    } else if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
                        return <div>{text} <ExpiringTag/></div>
                    } else {
                        return <div>{text} <ExpiredTag/></div>
                    }
                }
        },
        {
            title: 'Unit Price',
            dataIndex:
                'unitPrice',
            key:
                'unitPrice',
            render:
                (text, record) => {
                    return (<div onClick={() => showDetails(record)}>₱ {text}</div>);
                }
        },
        {
            title: 'Action',
            key:
                'action',
            render:
                (_, record) => (
                    <Space className="w-1">
                        <a onClick={() => handleUpdate(record)}><EditOutlined/></a>
                        <a onClick={() => handleDelete(record)}><DeleteOutlined/></a>
                    </Space>
                ),
        },
    ]
}

export const drugDetailCriteria = [
    {
        label: 'Product Name :',
        name:
            'productName',
        placeHolder:
            'Please Input',
    },
    {
        label: 'Category :',
        name:
            'category',
        placeHolder:
            'Please Input',
    },
    {
        label: 'Quantity On Hand :',
        name:
            'quantityOnHand',
        placeHolder:
            'Please Input',
    },
    {
        label: 'Expiry Date :',
        name:
            'expiryDate',
        placeHolder:
            'Please Input',
    },
    {
        label: 'Unit Price :',
        name:
            'unitPrice',
        placeHolder:
            'Please Input',
    },
];