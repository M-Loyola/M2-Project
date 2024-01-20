import React, {useCallback, useEffect, useState} from 'react';
import '../assets/style/App.css';
import '../index.css';
import {Col, Row, Table, Tag} from 'antd';
import {inventoryTableColumns} from '../assets/utils/tableColumns';
import {deleteDrugHook, fetchAllDrugs, updateDrugHook} from '../hooks/apiHooks';
import {UpdateModal} from './UpdateModal';
import {showConfirm} from './ConfirmModal';
import {CancelAlert} from './CancelAlert';
import {SuccessModal} from './SuccessModal';
import {DetailsModal} from "./DetailsModal";

const InventoryTable = (props) => {
    const [drugList, setDrugList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [recordToUpdate, setRecordToUpdate] = useState({})
    const [currentSelectedRecord, setCurrentSelectedRecord] = useState({})
    const [cancelAlertVisible, setCancelAlertVisible] = useState(false)
    const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [cancelAlertMessage, setCancelAlertMessage] = useState('Action Cancelled')

    const fetchData = async () => {
        const response = await fetchAllDrugs();
        setDrugList(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [props.status]);

    const handleUpdate = (record) => {
        setRecordToUpdate(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (record) => {
        try {
            setCancelAlertVisible(false);
            await showConfirm('Do you want to delete these items?');
            await deleteDrugHook(record.productId);
            setIsModalSuccessOpen(true);
        } catch (error) {
            setIsModalSuccessOpen(false);
        } finally {
            await fetchData();
        }
    };
    const hasNullOrEmptyValues = (updatedRecord) =>
        Object.values(updatedRecord).some(
            (value) => value === null || value === '' || value === 0
        );

    const updateRecord = useCallback(
        async (updatedRecord) => {
            setIsModalOpen(false);

            if (hasNullOrEmptyValues(updatedRecord)) {
                setCancelAlertMessage('Sorry, Cannot input empty values!');
                setCancelAlertVisible(true);
            } else {
                await updateDrugHook(updatedRecord.productId, updatedRecord).then(async () => {
                    await fetchData();
                }).catch(() => {
                    setIsModalOpen(true);
                    setCancelAlertMessage('Invalid input, please change');
                    setCancelAlertVisible(true);
                });
            }
        },
        []
    );

    const showDetails = (record) => {
        setCurrentSelectedRecord(record)
        setIsModalDetailsOpen(true)
    }

    return (
        <>
            <div className="p-4">
                <div className="search-border">
                    <Row align="left">
                        <Col>
                            <p className="search-title" style={{borderRight: "inset"}}>
                                Inventory Drug List
                            </p>
                        </Col>
                        <Col>
                            <p className="search-title">
                                <Row>
                                    <Col className="pr-2">Overall Total of Drugs in List :</Col>
                                    <Col>
                                        <Tag color="#a3a3c2" className="w-[50px] text-center">
                                            {drugList.length}
                                        </Tag>
                                    </Col>
                                </Row>
                            </p>
                        </Col>
                    </Row>
                    <hr/>
                    <div className="p-4 overflow-hidden">
                        <Table
                            rowKey="productId"
                            dataSource={drugList}
                            columns={inventoryTableColumns(handleUpdate, handleDelete, showDetails, drugList)}
                            className="table w-full"
                            size="small"
                            pagination
                        />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <UpdateModal
                    isModalOpen={isModalOpen}
                    isModalOpenCancel={(status) => setIsModalOpen(status)}
                    recordBeforeUpdate={recordToUpdate}
                    recordToUpdate={(updatedData) => updateRecord(updatedData)}
                    showSuccessModal={(status) => setIsModalSuccessOpen(status)}
                />
            )}
            {cancelAlertVisible && (
                <CancelAlert
                    message={cancelAlertMessage}
                    showCancelAlert={(status) => setCancelAlertVisible(status)}
                />
            )}
            {isModalSuccessOpen && (
                <SuccessModal
                    isModalOpen={isModalSuccessOpen}
                    isModalOpenCancel={(status) => setIsModalSuccessOpen(status)}
                    message={'Successfully Executed Action!'}
                />
            )}
            {isModalDetailsOpen && (
                <DetailsModal
                    isModalOpen={isModalDetailsOpen}
                    isModalOpenCancel={(status) => setIsModalDetailsOpen(status)}
                    record={currentSelectedRecord}
                />
            )}
        </>
    );
};

export default InventoryTable;
