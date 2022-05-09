import React, { FC, useEffect, useState } from 'react';
//redux
import { useSelector } from 'react-redux';
//components
import Controls from '../../../components/Controls';
import Iframe from '../../../components/Iframe';

const Stage: FC = () => {
    const [key, setKey] = useState(0);
    const {
        isLoading: playgroundLoading,
        default: playgroundDefault,
        baseUrl
    } = useSelector((state: any) => state.playground);

    useEffect(() => {
        setKey(key + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // componentWillUnmount
        return () => {
           // Your code here
           console.log("unmounted!")
        }
      }, []);

    return (
        <div className="Frame">
            {
                playgroundDefault.size !== undefined && !playgroundLoading ? 
                    <>
                        <Iframe 
                            key={key}
                            keyFrame={key}
                            title={`${playgroundDefault.size}-${playgroundDefault.name}`}
                            width={playgroundDefault.size.split("x")[0]}
                            height={playgroundDefault.size.split("x")[1]}
                            source={`${baseUrl}/${playgroundDefault.size}-${playgroundDefault.name}/index.html`}
                        />
                        <Controls /> 
                    </>
                    : null
            }
        </div>
    );
}

export default Stage;