export default function(state = null, action){
    switch (action.type){
        case 'SELECTED_USER': 
            if (action.payload || action.payload === false){
                if (action.payload.id)
                    return action.payload
                if (action.payload.data)
                    return action.payload.data.data;
                return false;
            }
            return state;
        default:
            return state;
            
    }
}