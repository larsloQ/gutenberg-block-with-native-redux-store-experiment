/* 
    redux native store inside of wordpress 
    with async thunk
    see actions for async requests
*/
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/* when store runs @@init action, this is the state.
   on later actions we use clientId/blockId as key
 */
const defaultState = {
    grapes: 0,
    bananas: 0,
    apples: 0,
};

function someReducers(state = defaultState, action) {
    // console.log("Reducer (state, action)", state, action)

    switch (action.type) {
        case "DATA_RESET":
            return {
                // ...state,
                [action.blockId]: { ...action.data },
            };
        case "DATA_RECEIVED":
            return {
                // ...state,
                [action.blockId]: { ...action.data },
            };
        default:
            return state;
    }
    // return state;
}

/*
 *  init the store with thunkMiddleware (for async) actions,
 *  and wraps composeWithDevTools around it, to make it visible in ReduxDev Tools
 *
 * Important: If you want to see the Actions and state in ReduxDevTools make sure to select:
 * "Edit Post" in Instances.
 * When having "autoselect" instances, to amount of actions produced by the gutenberg editor makes it much harder to pick the
 * action.
 */
export const initStore = (preloadedState) => {
    const middleWare = applyMiddleware(thunkMiddleware);
    const withDevTools = composeWithDevTools(middleWare);
    const store = createStore(someReducers, preloadedState, withDevTools);
    return store;
};
