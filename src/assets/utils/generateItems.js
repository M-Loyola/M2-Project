import {DatePicker, Input, Select} from "antd";
import React from "react";

export const generateInputFormItem = (criteria, isUpdate=false) =>  {
    const currentDate = new Date();
    const disabledDate = current => {
        return current < currentDate;
    };

    if (criteria.name === "expiryDate") {
        return isUpdate
            ? <DatePicker disabled className='w-full'/>
            : <DatePicker disabledDate={disabledDate} className='w-full'/>
    }
    else if ((criteria.name === "category")) {
        return <>
            <Select
                placeholder="Over the counter"
                className='w-full'
                options={[
                    {
                        value: 'Over the counter',
                        label: 'Over the counter',
                    },
                    {
                        value: 'Prescription',
                        label: 'Prescription',
                    },
                ]}
            />
        </>
    } else {
        return <Input placeholder={criteria.placeHolder} className='w-full'/>
    }
}

export const generateObjectFromForm = (form) => {
    return {
        productName: form.getFieldValue("productName")?.trim(),
        category: form.getFieldValue("category"),
        quantityOnHand: Number(form.getFieldValue("quantityOnHand")),
        expiryDate: form?.getFieldValue("expiryDate")?.format('YYYY-MM-DD').toString(),
        unitPrice: Number(form.getFieldValue("unitPrice"))
    }
};

export const generateObjectRegistryDetails = (form) => {
    return {
        username: form.getFieldValue("username"),
        password: form.getFieldValue("password")
    }
}