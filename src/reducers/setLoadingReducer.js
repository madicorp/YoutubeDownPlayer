export default (state = true, action) => {

    switch (action.type) {
        case 'set_loading':
            const {status} = action.payload;
            return status;
        default :
            return state;
    }

};