import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout, Menu, PageHeader, Select, Button, Spin, Skeleton, Drawer, Form } from 'antd';
import { BarsOutlined, InfoCircleOutlined } from '@ant-design/icons';

//reusable
import Affix from '../../components/Affix';

//children
import Stage from './Stage';
import Dynamic from './Dynamic';

//services
import { getCreatives, getPlayground } from '../../services/api/playground';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { isPlaygroundError, isPlaygroundSuccess, setPlaygroundDefault, setPlaygroundStart } from '../../store/reducers/playground';

//playground 
import { headerMenus } from '../../helpers/playground';

//less
import '../../assets/less/Playground/custom.less';

const { Header, Content } = Layout;

const { Option } = Select;


const Playground: FC = () => {
    const [form] = Form.useForm();
    const [close, setClose] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const {
        data: playgroundData,
        isLoading: playgroundLoading,
        default: playgroundDefault,
    } = useSelector((state: any) => state.playground);

    const load = async () => {
        dispatch(setPlaygroundStart());
        const { status: playgroundStatus, data: playgroundList} = await getPlayground({ id });

        if(playgroundStatus === 200){
            const result = await Promise.all(playgroundList.templateId.map(async (templateId: string) => {
                const { status: creativeStatus, data: creativeList, message: creativeError } = await getCreatives({ templateId });
                
                return creativeStatus === 200 ? creativeList : creativeError;
            }));

            if(result.length > 0){
                dispatch(isPlaygroundSuccess(result));
                dispatch(setPlaygroundDefault({
                    baseUrl: result[0].baseUrl,
                    template: result[0].template
                }));

                form.setFieldsValue(result[0].template.defaultDynamicFieldsValues);
            }else{
                dispatch(isPlaygroundError({message: "ERROR!"}))
            }
        }
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e:any) => {
        //dispatch(setPlaygroundDefault({}));
        dispatch(setPlaygroundStart());
        setTimeout(() => {
            dispatch(setPlaygroundDefault({
                baseUrl: playgroundData.filter((temp: any) => temp.template._id === e)[0].baseUrl,
                template: playgroundData.filter((temp: any) => temp.template._id === e)[0].template
            }));
        
            form.setFieldsValue(playgroundData.filter((temp: any) => temp.template._id === e)[0].template.defaultDynamicFieldsValues);
        }, 500);
    }

    const onClose = () => {
        setClose(!close);
    }

    return (
        <Layout className="Playground">
            <Header>
                <Link to="/">
                    <div className="logo" />
                </Link>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['0']}
                    items={
                        headerMenus.map((data: any, index: number) => {
                            return {
                                key: index,
                                label: data.title,
                                icon: data.icon
                            }
                        })
                    }
                />
            </Header>

            <PageHeader
                ghost={false}
                avatar={

                    playgroundDefault.suitableChannels !== undefined ? (
                     playgroundDefault.suitableChannels.includes("display") ?
                    { src: "https://app.ad-lib.io/static/media/googleIcon.3ca7ddde.svg" } :
                    { src: "https://app.ad-lib.io/static/media/facebookIcon.3234146a.svg" }
                    ): 
                    { src: <Skeleton.Avatar active={true} size={"default"} />}
                }
                title={playgroundDefault.name !== undefined ? playgroundDefault.name : <Skeleton.Input active={true} size={"default"} />}
                subTitle={playgroundDefault.name !== undefined ? <Button type="link" size="small" icon={<InfoCircleOutlined />} /> : <Skeleton.Button active={true} size={"small"} shape={"circle"} block={true} />}
                extra={
                    [
                        playgroundDefault._id !== undefined ?
                            <Select key="dimensions" defaultValue={playgroundDefault._id} style={{ width: 150 }} loading={playgroundLoading} onChange={(e: any) => onChange(e) }>
                                {
                                    playgroundData && playgroundData.map((data: any, index: number) => {
                                        return <Option key={index} value={data.template._id}>{data.template.size}</Option>
                                    })
                                }
                            </Select> : <Skeleton.Input key="skeleton-dimensions" active={true} size={"default"} />,
                        <Button onClick={onClose} key="dynamicElements" loading={playgroundLoading} type="primary" icon={<BarsOutlined />} />
                    ]
                }
            >
                <Spin tip="Loading..." spinning={playgroundLoading}>
                    <Content className="Stage">
                        {
                            playgroundDefault._id !== undefined ? <Stage /> : null
                        }
                    </Content>
                </Spin>
                <Drawer
                    forceRender 
                    title={`${playgroundDefault.dynamicElements !== undefined ? playgroundDefault.dynamicElements.length : <Skeleton.Input active={true} size={"default"} />} Dynamic Elements`}
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={close}
                    maskStyle={{background: "transparent"}}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="dynamic-form"
                    >
                        <Dynamic />
                    </Form>
                </Drawer>
                <Affix />
            </PageHeader>

        </Layout>
    )
}

export default Playground;