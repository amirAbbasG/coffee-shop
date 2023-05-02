import { createAction } from "@reduxjs/toolkit";

import {ApiCallAction} from "@custom-types/redux";

export const apiCallBegan = createAction<ApiCallAction>("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");
