import {Popover, Tag} from "antd";

export const ExpiredTag = () => {
    return (
        <Popover placement="right" content={"Drug has passed its expiration date"}>
            <Tag color="#cd201f" className="w-[130px] text-center">
                EXPIRED
            </Tag>
        </Popover>
    )
}

export const ExpiringTag = () => {
    return (
        <Popover placement="right" content={"Drug will expire within the next 30 or less days"}>
            <Tag color="#CD853F" className="w-[130px] text-center">
                EXPIRING
            </Tag>
        </Popover>
    )
}

export const GoodTag = () => {
    return (
        <Popover placement="right" content={"Drug still has good shelf life"}>
            <Tag color="#00A0EB" className="w-[130px] text-center">
                GOOD CONDITION
            </Tag>
        </Popover>
    )
}