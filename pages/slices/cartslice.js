import { createSlice } from "@reduxjs/toolkit";
import addedToCartToast from "../components/utils/Toast/addedToCartToast";

const initialState = {
    items: []
};

export const cartslice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        hydrate: (state, action) => {
            return action.payload;
        },
        addtocart: (state, action) => {
            const index = state.items.findIndex((cartitem) =>
                cartitem._id === action.payload._id
            );

            if (index >= 0) {
                let newcart = [...state.items];
                newcart[index] = {
                    ...newcart[index],
                    qty: newcart[index].qty + 1
                };
                state.items = newcart;
            } else {
                let item = { ...action.payload };
                state.items = [...state.items, item];
            }
            localStorage.setItem('cart_item', JSON.stringify(state.items));

            if (action.payload.toast) {
                addedToCartToast(action.payload.image, action.payload.title);
            }
        },
        updateqty: (state, action) => {
            let newcart = [...state.items];
            const index = state.items.findIndex((cartitem) =>
                cartitem._id === action.payload._id
            );
            if (index >= 0) {
                if (action.payload.qty >= 1) {
                    newcart[index] = action.payload;
                    state.items = newcart;
                } else {
                    newcart.splice(index, 1);
                    state.items = newcart;
                }
            } else {
                console.warn('Item did not find in cart');
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        emptycart: (state, action) => {
            state.items = [];
            localStorage.removeItem('cart_item');
        },
        removefromcart: (state, action) => {
            const index = state.items.findIndex((cartitem) =>
                cartitem._id === action.payload._id
            );
            let newcart = [...state.items];
            if (index >= 0) {
                newcart.splice(index, 1);
                state.items = newcart;
            } else {
                console.log(`Cannot remove as _id:${action.payload._id} is not present in the cart`);
            }
            localStorage.setItem('cart_item', JSON.stringify(state.items));
        }
    },
});

export const { addtocart, emptycart, updateqty, removefromcart, hydrate } = cartslice.actions;
export const selectitems = (state) => state.cart.items;
export const selecttotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);
export default cartslice.reducer;
