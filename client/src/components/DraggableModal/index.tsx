import React, { FC } from "react";

import { Modal } from "antd";

interface ModalProps {
    title: string,
    visible: boolean,
    handleCancel: any,
    mask: boolean,
    footer: any,
    isMaskClosable: boolean,
    modalStyle: object,
    content: any,
    width: number
}

const DraggableModal: FC<ModalProps> = ({title, visible, handleCancel, mask, footer, isMaskClosable, modalStyle, content, width}) => {
    return (
        <Modal width={width} style={modalStyle} title={title} visible={visible} onCancel={handleCancel} mask={mask} footer={footer} maskClosable={isMaskClosable}>
            {content}
        </Modal>
    )
}

export default DraggableModal;