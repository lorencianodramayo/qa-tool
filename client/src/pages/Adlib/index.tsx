import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Steps } from 'antd';

//redux
import { useDispatch, useSelector } from 'react-redux';

//helpers
import { steps } from '../../helpers/steps';

//styles
import '../../assets/less/Adlib/custom.less';
import { isPlaygroundError, isPlaygroundSuccess, setPlaygroundStart } from '../../store/reducers/playground';
import { savePlayground } from '../../services/api/playground';

//ant spread
const { Step } = Steps;

const Adlib: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const {
        selected: channelSelected
    } = useSelector((state:any) => state.channel);

    const {
        data: templates,
    } = useSelector((state:any) => state.template);

    const {
        selected: partnerSelected
    } = useSelector((state:any) => state.partner);

    const {
        selected: conceptSelected
    } = useSelector((state:any) => state.concept);

    const {
        isLoading: playgroundLoading,
    } = useSelector((state:any) => state.playground);


    const {
        data: verifyVersions
    } = useSelector((state: any) => state.verify);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const completed = async () => {
        console.log("clicked")
        dispatch(setPlaygroundStart());
        
        const { status: playgroundStatus, data: playgroundList, message: playgroundError } = await savePlayground(
            {
                partnerId: partnerSelected,
                conceptId: conceptSelected,
                templates: verifyVersions
            }
        );

        dispatch(playgroundStatus === 200 ? isPlaygroundSuccess(playgroundList) : isPlaygroundError(playgroundError));
        
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        playgroundStatus === 200 ? navigate(`/playground/${playgroundList._id}`) : null;
    }

    return (
        <div className="Adlib">
            <Row className="container">
                <Col xs={22} sm={20} md={19} lg={17}>
                    <Card className="steps" title="Concept QA Tool" loading={false}>
                        <Steps current={current}>
                            {
                                steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))
                            }
                        </Steps>

                        <Card className="steps-content">
                            {
                                steps[current].content
                            }
                        </Card>

                        <div className="steps-action">
                            <Row>
                                <Col span={12}>
                                    {current > 0 && !playgroundLoading && (
                                        <Button onClick={() => prev()}>
                                            Previous
                                        </Button>
                                    )}
                                </Col>
                                <Col span={12} className="button-right">
                                    {current === 0 && (
                                        <Button disabled={channelSelected !== null ? false : true} type="primary" onClick={() => next()}>
                                            Next
                                        </Button>
                                    )}

                                    {current === 1 && (
                                        <Button disabled={templates.length > 0 ? false : true} type="primary" onClick={() => next()}>
                                            Next
                                        </Button>
                                    )}

                                    {current === steps.length - 1 && (
                                        <Button loading={playgroundLoading} type="primary" onClick={() => completed()}>
                                            Lets go!
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>

                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Adlib;