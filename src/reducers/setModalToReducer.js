export default (state = false, action) => {

    switch (action.type) {
        case 'set_modal':
            const {status} = action.payload;
            console.log(status);
            return status;
        default :
            return state;
    }

};