'use client';
import React from 'react';
import { Col, Row, Skeleton } from 'antd';

export default function Loading() {
    return <Row gutter={[40, 40]} justify="center">
        <Col span={24}>
            <Skeleton active />
        </Col>
    </Row>
}