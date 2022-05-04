import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Stage: FC = () => {
    const [key, setKey] = useState(0);
    const {
        data: playgroundData,
        isLoading: playgroundLoading,
        default: playgroundDefault,
    } = useSelector((state: any) => state.playground);

    useEffect(() => {
        setKey(key + 1);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {
                playgroundDefault.size !== undefined && !playgroundLoading ? 
                    <iframe
                        key={key}
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