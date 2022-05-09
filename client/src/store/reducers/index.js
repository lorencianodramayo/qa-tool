import { combineReducers } from "@reduxjs/toolkit";
import channelReducer from "./channel";
import conceptReducer from "./concept";
import partnerReducer from "./partner";
import playgroundReducer from "./playground";
import templateReducer from "./templates";
import verifyReducer from "./verify";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
    partner: partnerReducer,
    concept: conceptReducer,
    channel: channelReducer,
    template: templateReducer,
    verify: verifyReducer,
    playground: playgroundReducer,
    settings: settingsReducer
});

export default rootReducer;