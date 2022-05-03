import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, PageHeader, Select, Button } from 'antd';
import { BarsOutlined } from '@ant-design/icons';

//playground 
import { headerMenus } from '../../helpers/playground';

//less
import '../../assets/less/Playground/custom.less';

const { Header, Content } = Layout;

const { Option } = Select;


const Playground: FC = () => {
    return (
        <Layout className="Playground">
            <Header>
                <Link to="/">
                    <div className="logo" />
                </Link>
                
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
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
                avatar={{src: "https://app.ad-lib.io/static/media/googleIcon.3ca7ddde.svg"}}
                title="Specsavers Global"
                subTitle="UK Variant"
                extra={
                    [
                        <Select key="dimensions" defaultValue="lucy" style={{width: 150}}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>,
                        <Button key="dynamicElements" type="primary" icon={<BarsOutlined />}/>
                    ]
                }
            >
                <Content className="Stage">
                
                </Content>
            </PageHeader>

        </Layout>
    )
}

export default Playground;