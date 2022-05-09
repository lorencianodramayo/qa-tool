import React, { FC, useEffect, useState, useRef } from "react";

import { Table, Select, Row, Col, Form } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';

import { useDispatch, useSelector } from "react-redux";
import { getTemplateStart, setLoadingTemplate, setTemplateSelected, setTemplateVersions } from "../../../store/reducers/templates";

const { Option } = Select;

interface DataType {
    id: string, 
    key: React.Key;
    size: string;
    name: string;
    templateVersions: string;
}

const List: FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [data, setData] = useState([]);
    const {
        selected: channelSelected,
        templates
    } = useSelector((state: any) => state.channel);

    const {
        initialValues,
        selected: selectedRow,
        isLoading: templateLoading
    } = useSelector((state:any) => state.template);

    useEffect(() => {
       dispatch(getTemplateStart());
        const result = templates.map((data: any, index: number) => {
            console.log(data)
            if(Object.keys(initialValues).indexOf(`${data.size}-${data._id}`) < 0) {
                dispatch(setTemplateVersions({
                    key:[`${data.size}-${data._id}`],
                    value: data.versionId[0]
                }));
            }

            return data.suitableChannels.includes(channelSelected) && !data.archived ?
                {
                    id: `${data.size}-${data._id}`,
                    key: index,
                    size: data.size,
                    name: data.name,
                    templateVersions: data.templateVersions
                } : null

        })
        //.sort((a: any, b: any) => Number(a.size.split("x")[1]) < Number(b.size.split("x")[1]) ? -1 : 0)
        //.sort((a: any, b: any) => Number(a.size.split("x")[0]) < Number(b.size.split("x")[0]) ? -1 : 0)
        .filter((el:any) => el != null)

        setData(result);
        form.setFieldsValue(initialValues);
        setTimeout(()=> {
            dispatch(setLoadingTemplate());
            clearTimeout();
        },100);
    }, [channelSelected, dispatch, form, initialValues, templates]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {
            title: 'Dimension',
            dataIndex: 'size',
            filters: templates.map((data: any) => {
                return {
                    text: data.size,
                    value: data.size,
                    ch: data.suitableChannels.includes(channelSelected) ? true : false
                }
            }).sort((a: any, b: any) => Number(a.text.split("x")[1]) < Number(b.text.split("x")[1]) ? -1 : 0)
                .sort((a: any, b: any) => Number(a.text.split("x")[0]) < Number(b.text.split("x")[0]) ? -1 : 0)
                .filter((value:any, index:any, self:any) =>  self.findIndex((v: any) => v.text === value.text && v.value === value.value && v.ch === true) === index),
            onFilter: (value:any, record:any) => record.size.indexOf(value) === 0,
            filterSearch: true,
            key: 'size',
            width: 150
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: templates.map((data: any) => {
                return {
                    text: data.name,
                    value: data.name,
                    ch: data.suitableChannels.includes(channelSelected) ? true : false
                }
            }).filter((value:any, index:any, self:any) =>  self.findIndex((v: any) => v.text === value.text && v.value === value.value && v.ch === true) === index),
            onFilter: (value:any, record:any) => record.name.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Versions',
            dataIndex: 'templateVersions',
            key: 'templateVersions',
            width: 200,
            render: (templates: any[], row:any) => (
                <Form.Item name={row.id} style={{margin:0}}>
                    <Select style={{ width: "100%" }} suffixIcon={null} >
                        {templates.map((template, index) => {
                            return (
                                <Option value={template.id} key={index}>
                                    <Row>
                                        <Col span={12}>
                                            {template.versionName === null ? `Version ${index + 1}` : `Version ${template.versionName}`}
                                        </Col>
                                        {
                                            template.approvals !== undefined ?
                                                <Col span={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}><CheckCircleTwoTone twoToneColor="#52c41a" /></Col>
                                                : null
                                        }

                                    </Row>
                                </Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            ),
        },
    ].filter(item => !item.hidden);

    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: (selectedRowKeys: any, selectedRows: DataType[]) => {
            dispatch(setTemplateSelected(
                {
                    rowKeys: selectedRowKeys,
                    rowIds: selectedRows.map((data:any) => data.id)
                }
            ));
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.name,
        }),
    };

    const onChange = (e: any) => {
        dispatch(setTemplateVersions(
            {
                key: Object.keys(e)[0],
                value: Object.values(e)[0]
            }
        ))
    }

    return (
        <div className="template-list">
            <Form
                form={form}
                layout="vertical"
                ref={formRef}
                onValuesChange={(e: any) => onChange(e)}
            >
                <Table
                    bordered={true}
                    size={"small"}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={templateLoading}
                />
            </Form>
        </div>
    );
}

export default List;