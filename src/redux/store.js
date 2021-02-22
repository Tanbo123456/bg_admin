import { createStore,applyMiddleware } from "redux";
// 异步处理的中间件
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import Reducer from "./reducer";

export default createStore(Reducer,composeWithDevTools(applyMiddleware(thunk)))