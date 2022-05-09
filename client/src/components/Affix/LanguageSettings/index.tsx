import React, { FC } from "react";
import { Button, Col, Collapse, Radio, Row, AutoComplete, Divider, Card, Alert, Form, Input } from "antd";
import { AppstoreAddOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const LanguageSettings: FC = () => {
    return (
        <div>
            <Alert
                message="Simplified Chinese"
                description="Detailed description and advice about successful copywriting. etailed description and advice about successful copywriting."
                type="success"
                style={{ marginBottom: "1.5em" }}
            />
            <Collapse
                ghost
                expandIconPosition="right"
            >
                <Panel className="language-settings" header={
                    <Row gutter={[8, 8]}>
                        <Col flex="100px" onClick={event => event.stopPropagation()}>
                            <AutoComplete
                                //options={options}
                                style={{ width: 200 }}
                                //onSelect={onSelect}
                                //onSearch={onSearch}
                                placeholder="Find Country"
                            />
                        </Col>
                        <Col onClick={event => event.stopPropagation()} flex="auto">
                            <Divider style={{ margin: 0 }} />
                        </Col>
                        <Col flex="32px" style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button type="primary" shape="circle" icon={<AppstoreAddOutlined />} />
                        </Col>
                    </Row>
                }
                    key="1"
                    showArrow={false}>
                    <Divider orientation="right" plain style={{ margin: 0 }}>Add New Language</Divider>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item label="Name">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Sentence">
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" ghost>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Panel>
            </Collapse>


            <Card>
                <div style={{
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 34em)"
                }}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        {/* <Radio.Button value="a" style={{ margin: "0.2em" }}>Hangzhou</Radio.Button>
                        */}
                    </Radio.Group>
                </div>
            </Card>
        </div>
    )
}

export default LanguageSettings;