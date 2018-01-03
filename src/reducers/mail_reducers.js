export default function(state = null, action){
    switch (action.type){
        case 'MAIL_LIST': 
            if (action.payload){
                if (action.payload.id)
                    return action.payload
                if (action.payload.data)
                    return action.payload.data.data;
            }
            return {id: null}
        default:
            return state;
            
    }
}