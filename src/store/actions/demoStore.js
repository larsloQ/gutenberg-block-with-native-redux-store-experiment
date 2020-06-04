/*
    import these into block. you can run async functions here (as long as store has thunk middleware)
    so actions can return a promise or a plain object
*/
/* eslint-disable no-undef */

function receivePosts(data, blockId) {
    // console.log("Action: data received", data, blockId)
    return {
        type: "DATA_RECEIVED",
        data: data,
        blockId,
        receivedAt: Date.now(),
    };
}

export function fetchData(blockId) {
    // console.log("Action: dispatching fetchData", blockId)
    return async (dispatch) => {
        const response = await wp.apiFetch({
            path: "/native/redux/demo/route",
        });
        dispatch(receivePosts(response, blockId));
    };
}

export function resetData(blockId) {
    // console.log("Action: dispatching DATA_RESET")
    return {
        type: "DATA_RESET",
        data: {
            grapes: 0,
            bananas: 0,
            apples: 0,
        },
        blockId,
        receivedAt: Date.now(),
    };
}
