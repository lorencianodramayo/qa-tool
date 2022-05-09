import React, { FC } from "react";


interface FrameProps {
    keyFrame: number,
    title: string,
    width: number,
    height: number,
    source: string
}

const Iframe: FC<FrameProps> = ({keyFrame, title, width, height, source}) => {
    return(
        <iframe
            key={keyFrame}
            title={title}
            width={width}
            height={height}
            frameBorder={0}
            src={source}
        />
    )
}

export default Iframe;