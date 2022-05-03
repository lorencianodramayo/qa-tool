import { combineReducers } from "@reduxjs/toolkit";
import channelReducer from "./channel";
import conceptReducer from "./concept";
import partnerReducer from "./partner";
import playgroundReducer from "./playground";
import templateReducer from "./templates";
import verifyReducer from "./verify";

const rootReducer = combineReducers({
    partner: partnerReducer,
    concept: conceptReducer,
    channel: channelReducer,
    template: templateReducer,
    verify: verifyReducer,
    playground: playgroundReducer
});

export default rootReducer;