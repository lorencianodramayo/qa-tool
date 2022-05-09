import React, { FC, useState } from "react";

import { SketchPicker } from "react-color";

import { useDispatch, useSelector } from "react-redux";
import { setImageVisibility } from "../../store/reducers/settings";


import { Button, Col, Popover, Row, Tooltip } from "antd";
import { 
    SettingOutlined, 
    PictureOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    StrikethroughOutlined,
    TranslationOutlined,
    SaveOutlined
} from '@ant-design/icons';
import DraggableModal from "../DraggableModal";
import GenericModal from "../GenericModal";
import LanguageSettings from "./LanguageSettings";

const options = [
    {
        text: 'Show/Hide Image',
        label: 'image',
        icon: <PictureOutlined />
    },
    {
        text: 'Change Background',
        label: 'background',
        icon: <BgColorsOutlined />
    },
    {
        text: 'Text Settings',
        label: 'text',
        icon: <FontSizeOutlined />
    },
    {
        text: 'Split Text',
        label: 'split',
        icon: <StrikethroughOutlined />
    },
    {
        text: 'Language',
        label: 'language',
        icon: <TranslationOutlined />
    },
    {
        text: 'Add to Preview',
        label: 'preview',
        icon: <SaveOutlined />
    }
]

const Affix: FC = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        isBackgroundVisible: false,
        isLanguageVisible: false,
    })
    const {
        affix: affixes
    } = useSelector((state: any) => state.settings);
    
    const handleClick = (text: String) => {
        switch(text){
            case 'image':
                dispatch(setImageVisibility(affixes.image))
            break;
            case 'background':
                setState({
                    ...state,
                    isBackgroundVisible: !state.isBackgroundVisible
                })
            break;
            case 'text':
                console.log(text)
            break;
            case 'split':
                console.log(text)
            break;
            case 'language':
                setState({
                    ...state,
                    isLanguageVisible: !state.isLanguageVisible
                })
            break;
            default:
                console.log(text)
            break;

        }
    }

    return (
        <div className="affix">
            <Popover
                placement="topLeft"
                overlayClassName="affix-over"
                content={
                    <Row gutter={[0,8]}>
                        {
                            options.map((data: any, index: number) => {
                                return(
                                    <Col span={24} key={index}>
                                        <Tooltip title={data.text} color="purple" placement="right">
                                            <Button 
                                                type="primary" 
                                                ghost 
                                                shape="circle" 
                                                icon={data.icon} 
                                                style={
                                                    data.label === "image" && affixes.image ?
                                                    {backgroundColor: "#29125f", color: "#ffffff", borderColor: "#ffffff"}
                                                    :
                                                    {backgroundColor: "#ffffff", color: "#ff0078", borderColor: "#ff0078"}
                                                }
                                                onClick={() => handleClick(data.label)}
                                            />
                                        </Tooltip>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                }
                trigger="click"
            >
                <Button type="primary" shape="circle" icon={<SettingOutlined />} />
            </Popover>

            <DraggableModal 
                title={"Modify Backgronud Color"} 
                visible={state.isBackgroundVisible}
                handleCancel={()=> setState({ ...state, isBackgroundVisible: !state.isBackgroundVisible })} 
                mask={false}
                footer={false}
                isMaskClosable={false}
                width={268}
                content={<SketchPicker />}
                modalStyle={{
                    left: 0,
                    margin: "2em 1.8em",
                    padding: 0
                }}
            />
            <GenericModal 
                title={"Language Settings"} 
                visible={state.isLanguageVisible}
                handleCancel={()=> setState({ ...state, isLanguageVisible: !state.isLanguageVisible })} 
                mask={true}
                footer={false}
                isMaskClosable={true}
                centered={true}
                bodyStyle={{height: "auto"}}
                content={<LanguageSettings />}
            />
        </div>
    )
}

export default Affix;