import React, { FC } from "react";

import { Modal } from "antd";

interface ModalProps {
    title: string,
    visible: boolean,
    handleCancel: any,
    mask: boolean,
    footer: any,
    isMaskClosable: boolean,
    centered: boolean,
    bodyStyle: object,
    content: any
}

const GenericeModal: FC<ModalProps> = ({title, visible, handleCancel, mask, footer, isMaskClosable, centered, bodyStyle, content}) => {
    return (
        <Modal bodyStyle={bodyStyle} title={title} visible={visible} onCancel={handleCancel} mask={mask} footer={footer} maskClosable={isMaskClosable} centered={centered}>
            {content}
        </Modal>
    )
}

export default GenericeModal;