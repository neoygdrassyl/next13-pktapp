"use client";
import React from 'react';
import { Space, Table, Tag } from 'antd';


export default function PKTable(props) {
    const { data, columns } = props;

    return <Table columns={columns} dataSource={data} />

}