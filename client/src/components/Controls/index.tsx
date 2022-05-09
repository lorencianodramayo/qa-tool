
import React, { FC, useState } from "react";

import { Button, Col, Row, Slider } from "antd";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    ReloadOutlined
  } from '@ant-design/icons';

const Controls: FC = () => {
    const [pause, setPause] = useState(false);

    return(
        <div className="controls">
            <Row>
                <Col flex="32px">
                    <Button type="link" icon={!pause ? <PlayCircleOutlined /> : <PauseCircleOutlined />} onClick={()=>setPause(!pause)}/>
                </Col>
                <Col  flex="auto">
                    <Slider tipFormatter={null} />
                </Col>
                <Col flex="32px" style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button type="link" icon={<ReloadOutlined />} />
                </Col>
            </Row>
        </div>
    )
}

export default Controls;