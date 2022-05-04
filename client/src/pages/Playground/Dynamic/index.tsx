import React, { FC, useEffect } from "react";
import { Skeleton, Form, Input } from "antd";

import { useSelector } from "react-redux";

const Dynamic: FC = () => {
    const [form] = Form.useForm();

    const {
        default: playgroundDefault,
    } = useSelector((state: any) => state.playground);

    useEffect(() => {
        if(playgroundDefault.defaultDynamicFieldsValues !== undefined){
            form.setFieldsValue(playgroundDefault.defaultDynamicFieldsValues);
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return(
        <div>
            {
                playgroundDefault.dynamicElements !== undefined ? 
                <Form
                    form={form}
                    layout="vertical"
                >
                    {
                        playgroundDefault.dynamicElements.map((data: any, index: number) => {
                            return (
                                <Form.Item key={index} label={data} name={data} required>
                                    <Input placeholder="input placeholder" />
                                </Form.Item>
                            )
                        })
                    }
                </Form>
                : <Skeleton.Input active={true} size={"default"} />

            }
        </div>
    );
}

export default Dynamic;