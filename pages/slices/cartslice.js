import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    items:[]
}

export const cartslice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        hydrate:(state,action)=>{
            return action.payload
        },
        addtocart:(state,action)=>{
            const index =state.items.findIndex((cartitem)=>{
                cartitem._id ===action.payload._id
            })
            if(index>=0){
                let newcart =[...state.items]
                newcart[index]={
                    ...newcart[index],
                    qty:newcart[index].qty+1
                }
                state.items =newcart
            }
            else {
                let item ={...action.payload}
                state.items =[...state.items,item]
            }

        },
        emptycart:(state,action)=>{
            state.items=[]
        }
    }
})
export const {addtocart,emptycart}=cartslice.actions
export const selectitems =(state)=>state.cart.items
export const selecttotal =(state)=>state.cart.items.reduce((total,item)=>total+item.price*item.qty,0)
export default cartslice.reducer

