import { setError } from "../store/error.slice";
const errorMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        store.dispatch(setError(action.payload));
    }
    return next(action);
};

export default errorMiddleware;