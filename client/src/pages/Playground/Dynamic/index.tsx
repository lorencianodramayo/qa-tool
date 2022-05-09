import React, { FC, useEffect } from "react";
import { Skeleton, Form, Input, Button, Image, Select } from "antd";
import { HighlightOutlined } from '@ant-design/icons';

import { useSelector } from "react-redux";

const { Option } = Select;

const Dynamic: FC = () => {
    const {
        default: playgroundDefault,
        baseUrl
    } = useSelector((state: any) => state.playground);

    const {
        affix
    } = useSelector((state: any) => state.settings);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                playgroundDefault.dynamicElements !== undefined ?
                    <>
                        {
                            playgroundDefault.dynamicElements.map((data: any, index: number) => {
                                switch (true) {
                                    case (/text/i.test(data)):
                                    case (/disclaimer/i.test(data)):
                                    case (/legal/i.test(data)):
                                    case (/headline/i.test(data)):
                                    case (/price/i.test(data)):
                                    case (/currency/i.test(data)):
                                        return (
                                            <div key={index}>
                                                <Form.Item label={data} name={data} required>
                                                    <Input placeholder={`${data}`} suffix={<span style={{ color: "#b8b3b3" }}>{0}</span>} />
                                                </Form.Item>
                                            </div>
                                        )
                                    case (/image/i.test(data)):
                                    case (/logo/i.test(data)):
                                    case (/img/i.test(data)):
                                    case (/background/i.test(data)):
                                    case (/roundel/i.test(data)):
                                    case (/video/i.test(data)):
                                    case (/audio/i.test(data)):
                                    case (/packshot/i.test(data)):
                                        return (
                                            <div key={index} style={affix.image ? { display: "block"} : { display: "none" }}>
                                                <Form.Item label={data} name={data} required className="image-items">
                                                    <Input placeholder={`${data}`} hidden />
                                                </Form.Item>
                                                {
                                                    <Button
                                                        type="dashed"
                                                        className="buttonImage"
                                                    >
                                                        <div
                                                            style={{
                                                                padding: "0.2em",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                height: "-webkit-fill-available",
                                                                width: "-webkit-fill-available",
                                                            }}
                                                        >
                                                            
                                                            <Image
                                                                preview={{ visible: false, mask: <HighlightOutlined /> }}
                                                                src={`${baseUrl}/${playgroundDefault.size}-${playgroundDefault.name}/${playgroundDefault.defaultDynamicFieldsValues[data]}`}
                                                            />
                                                        </div>
                                                    </Button>
                                                }
                                            </div>)

                                    default:
                                        return (
                                            (playgroundDefault.possibleValues[data] !== undefined ) ?
                                                <div key={index}>
                                                    <Form.Item label={data} name={data} required>
                                                        <Select>
                                                            {playgroundDefault.possibleValues[data].map((pval: any, pindex: number) => {
                                                                return (
                                                                    <Option
                                                                        value={
                                                                            pval.split("")[0] === " "
                                                                                ? pval.split("").slice(1).join("")
                                                                                : pval
                                                                        }
                                                                        key={pindex}
                                                                    >
                                                                        {pval.split("")[0] === " "
                                                                            ? pval.split("").slice(1).join("")
                                                                            : pval}
                                                                    </Option>
                                                                );
                                                            })}
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                                :
                                                <Form.Item key={index} label={data} name={data} required>
                                                    <Input placeholder={`${data}`} />
                                                </Form.Item>
                                        )
                                }
                            })
                        }
                    </>
                    : <Skeleton.Input active={true} size={"default"} />

            }
        </div>
    );
}

export default Dynamic;