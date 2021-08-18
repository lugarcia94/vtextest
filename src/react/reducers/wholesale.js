const INIT_WHOLESALE = {
    items: [],
    quantity: 0
};
export function wholesale(state=INIT_WHOLESALE, action) {
    switch(action.type) {
        case 'WHOLESALES':
            let quantity = action.wholesales.map((item)=>item.quantity).reduce((a,b)=> a+b);
            return { 
                items: action.wholesales,
                quantity
            };
        default: 
            return state;
    }
}