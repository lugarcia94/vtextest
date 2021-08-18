export function giftlist(state = {}, action) {
    switch (action.type) {
        case 'GIFTLIST':
            return action.giftlist;

        default:
            return state;
    }
}
