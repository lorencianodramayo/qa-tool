import React, { FC, useEffect, useState } from "react";
import Moment from 'moment'

import { PageHeader, Button, Collapse, Tag, Row, Col, Divider, Skeleton } from 'antd';
import { GoogleOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';

import { requestTemplateVersion } from "../../../services/api/template";

import { useDispatch, useSelector } from "react-redux";
import { getVerifyStart, resetVerify, isVerifyError, isVerifySuccess } from "../../../store/reducers/verify";


const { Panel } = Collapse;

const Verify: FC = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState([]);
    const [loadPanel, setLoadPanel] = useState(true);
    const {
        data: partners,
        selected: partnerSelected
    } = useSelector((state: any) => state.partner);

    const {
        data: concepts,
        selected: conceptSelected
    } = useSelector((state: any) => state.concept);

    const {
        selected: channelSelected,
        templates
    } = useSelector((state: any) => state.channel);

    const {
        data: versions,
        selectedIndex
    } = useSelector((state: any) => state.template);

    const {
        data: verifyVersions
    } = useSelector((state: any) => state.verify);

    const load = async () => {
        dispatch(getVerifyStart());
        const response = await Promise.all( versions.map(async (version: any) => {
            const { status, data, message } = await requestTemplateVersion(version, partnerSelected);

            return dispatch(status === 200 ? isVerifySuccess(data) : isVerifyError(message));
        }));

        return response;
    }

    const version = async () => {
        const response = await Promise.all(selectedIndex.map( async (i:any) => {
            const specific = await  templates.filter((temp: any) => temp._id === i.creativeId)[0].templateVersions;
            
            return {
                vId: [i.versionId],
                specific
            };
        }));

        return response;
    }

    useEffect(() => {
        dispatch(resetVerify());
        load().then(() => setLoadPanel(false));
        version().then((data: any) => {setState(data);});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="Verify">
            <Skeleton loading={loadPanel} paragraph={{ rows:10 }}  active>
            <div className="content">
                <PageHeader
                    ghost={false}
                    title={concepts.filter((value: any) => value._id === conceptSelected).map((obj: any) => obj.name)}
                    subTitle={partners.filter((value: any) => value._id === partnerSelected).map((obj: any) => obj.name)}
                    extra={
                        channelSelected === "display" ?
                            [<Button key="1" type="primary" ghost shape="circle" icon={<GoogleOutlined />} />]
                            :
                            [<Button key="2" type="primary" ghost shape="circle" icon={<FacebookFilled />} />,
                            <Button key="3" type="primary" ghost shape="circle" icon={<InstagramFilled />} />]
                    }
                >
                    <Divider orientation="center">{verifyVersions.length} Creative Templates</Divider>
                    <Collapse
                        ghost
                        accordion 
                    >
                        {
                            [...verifyVersions]
                                .sort((a: any, b: any) => Number(a.size.split("x")[1]) < Number(b.size.split("x")[1]) ? -1 : 0)
                                .sort((a: any, b: any) => Number(a.size.split("x")[0]) < Number(b.size.split("x")[0]) ? -1 : 0)
                                .map((data: any, index: number) => {
                                return (
                                    <Panel header={data.size} key={index} extra={<Tag color="purple">{data.name}</Tag>}>
                                        <Row>
                                            <Col span={14}>
                                                <Row>
                                                    <Col span={8}>
                                                        Name
                                                    </Col>
                                                    <Col span={16}>
                                                        {data.name}
                                                    </Col>
                                                    <Divider/>
                                                    <Col span={8}>
                                                        Dimension
                                                    </Col>
                                                    <Col span={16}>
                                                        {data.size}
                                                    </Col>
                                                    <Divider/>
                                                    <Col span={8}>
                                                        Version
                                                    </Col>
                                                    <Col span={16}>
                                                        {data.versionName !== null? data.versionName : 
                                                            state.filter((s: any) => 
                                                                s.vId[0] === data._id)
                                                                    .map((d: any) => 
                                                                        d.specific.findIndex((e: any) => 
                                                                        e.id===data._id) + 1)
                                                        }
                                                    </Col>
                                                    <Divider/>
                                                    <Col span={8}>
                                                        Uploaded
                                                    </Col>
                                                    <Col span={16}>
                                                        {Moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss A')}
                                                    </Col>
                                                    <Divider/>
                                                    <Col span={8}>
                                                        Dynamic Elements ({data.dynamicElements.length}) 
                                                    </Col>
                                                    <Col span={16}>
                                                        {data.dynamicElements.map((data: any, index: number) => <Tag style={{margin: "0.2em 0.3em 0.2em 0"}} key={index}>{data}</Tag>)}
                                                    </Col>
                                                    {
                                                        data["possibleValues"] !== undefined?
                                                        <>
                                                            <Divider/>
                                                            <Col span={8}>
                                                            Possible Values ({Object.keys(data.possibleValues).length})
                                                            </Col>
                                                            <Col span={16}>
                                                                {Object.keys(data.possibleValues).map((data: any, index: number) => <Tag style={{margin: "0.2em 0.3em 0.2em 0"}} key={index}>{data}</Tag>)}
                                                            </Col>
                                                        </> : null
                                                    }
                                                    
                                                </Row>
                                            </Col>
                                            <Col span={10} >
                                                <div className="iframe">
                                                    <iframe className={Number(data.size.split("x")[0]) > Number(data.size.split("x")[1]) ? "horizontal" : "vertical"} width={data.size.split("x")[0]} height={data.size.split("x")[1]} src={`${data.contentLocation}/index.html`} title={data.size}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>

                </PageHeader>
            </div>

            
            </Skeleton>
        </div>
    )
}

export default Verify;