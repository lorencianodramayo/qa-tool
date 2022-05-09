import React, { FC, useEffect, useRef } from "react";
import { Col, Form, Row, Select } from "antd";

//helpers
import { fields } from "../../../helpers/info";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getPartnerStart, isPartnerError, isPartnerSuccess, setPartnerSelected } from "../../../store/reducers/partner";
import { getConceptStart, isConceptError, isConceptSuccess, resetConcept, setConceptSelected } from "../../../store/reducers/concept";
import { getChannelStart, isChannelError, isChannelSuccess, resetChannel, setChannelSelected } from "../../../store/reducers/channel";
import { resetTemplate } from "../../../store/reducers/templates";

//services
import { requestPartners } from "../../../services/api/partners";
import { requestConcept } from "../../../services/api/concept";
import { requestTemplates } from "../../../services/api/channel";

//utils
import { getToken } from '../../../utils/authenticate';

const { Option } = Select;

const Info: FC = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const formRef = useRef(null);

    // States
    const {
        data: partners,
        isLoading: hasPartner,
        isDisabled: isPartnerDisabled,
        selected: partnerSelected
    } = useSelector((state:any) => state.partner);

    const {
        data: concepts,
        isLoading: hasConcept,
        isDisabled: isConceptDisabled,
        selected: conceptSelected
    } = useSelector((state:any) => state.concept);

    const {
        data: channels,
        isLoading: hasChannel,
        isDisabled: isChannelDisabled,
        selected: channelSelected
    } = useSelector((state:any) => state.channel);

    const load = async () => {
        dispatch(getPartnerStart());
        await getToken();
        const { status, data, message } = await requestPartners();
        return dispatch(status === 200 ? isPartnerSuccess(data) : isPartnerError(message));
    }

    useEffect(() => {
        form.setFieldsValue({
            Partner: partnerSelected,
            Concept: conceptSelected,
            Channel: channelSelected
        });

        load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onChange = async (e:any) => {
        switch(Object.keys(e).toString()){
            case 'Partner':
                form.setFieldsValue({
                    Concept: null,
                    Channel: null
                });
                dispatch(resetTemplate());
                dispatch(resetConcept());
                dispatch(resetChannel());
                dispatch(getConceptStart());

                const { status: conceptStatus, data: conceptList, message: conceptError } = await requestConcept(Object.values(e)[0]);
                
                dispatch(conceptStatus === 200 ? isConceptSuccess(Object.keys(conceptList)[0] !== "error" ? conceptList.filter((item: any ) => !item.archived) : conceptList) : isConceptError(conceptError));
                dispatch(setPartnerSelected(Object.values(e)[0]));
            break;
            case 'Concept':
                form.setFieldsValue({
                    Channel: null
                });
                dispatch(resetChannel());
                dispatch(getChannelStart());

                const { status: channelStatus, data: channelData, message: channelError } = await requestTemplates(Object.values(e)[0], form.getFieldValue("Partner"));

                dispatch(channelStatus === 200 ? isChannelSuccess(channelData) : isChannelError(channelError));
                dispatch(setConceptSelected(Object.values(e)[0]));
            break;
            default:
                dispatch(setChannelSelected(Object.values(e)[0]));
                dispatch(resetTemplate());
            break;
        }
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Form
                        form={form}
                        layout="vertical"
                        ref={formRef}
                        onValuesChange={(e:any) => onChange(e)}
                    >
                        {
                            fields.map((data: any, index: number) => {
                                return (
                                    <Form.Item name={data} label={data} key={index}>
                                        <Select
                                            style={{ width: "100%" }}
                                            size="large"
                                            showSearch
                                            disabled={
                                                data === "Partner" ? isPartnerDisabled :
                                                    data === "Concept"? isConceptDisabled : 
                                                        data === "Channel"? isChannelDisabled : false
                                            }
                                            loading={
                                                data === "Partner" ? hasPartner : 
                                                    data === "Concept" ? hasConcept : 
                                                        data === "Channel" ? hasChannel : false
                                            }
                                            placeholder={`Select a ${data}`}
                                            optionFilterProp="children"
                                            allowClear
                                            filterOption={(input: any, option: any) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {
                                                data === 'Partner' ?
                                                    partners.length > 0 ?
                                                        partners.map(
                                                            (partner: any, index: number) => 
                                                                <Option value={partner._id} key={index}>{partner.name}</Option>
                                                        ) 
                                                    :null
                                                : data === 'Concept' ?
                                                    concepts.length > 0 ?
                                                        concepts.map(
                                                            (concept: any, index: number) => 
                                                                !concept.archived ?
                                                                <Option value={concept._id} key={index}>{concept.name}</Option> : null
                                                        ).sort((a: any, b: any) => a.name < b.name ? -1 : 0)
                                                    :null
                                                : channels.length > 0 ?
                                                    channels.map(
                                                        (channel: any, index: number) => 
                                                            <Option value={channel.toLowerCase()} key={index}>{channel}</Option>
                                                    )
                                                :null
                                            }
                                        </Select>
                                    </Form.Item>
                                )
                            })
                        }
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Info;