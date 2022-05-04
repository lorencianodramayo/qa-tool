import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Stage: FC = () => {
    const {
        data: playgroundData,
        isLoading: playgroundLoading,
        default: playgroundDefault,
    } = useSelector((state: any) => state.playground);

    useEffect(() => {
        console.log(playgroundData);
        console.log(playgroundDefault);
    })
    
    return (
        <div>
            {
                playgroundDefault.size !== undefined && !playgroundLoading ? 
                    <iframe
                        title={`${playgroundDefault.size}-${playgroundDefault.name}`}
                        width={playgroundDefault.size.split("x")[0]}
                        height={playgroundDefault.size.split("x")[1]}
                        frameBorder={0}
                        src={`${playgroundData.baseUrl}/${playgroundDefault.size}-${playgroundDefault.name}/index.html`}
                    /> : null
            }
        </div>
    );
}

export default Stage;