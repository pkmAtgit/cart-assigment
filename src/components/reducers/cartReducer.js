import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,DATA_RECEIVED, CHANGE_QUANTITY } from '../actions/action-types/cart-actions'



const cartReducer= (state = 0, action)=>{
    
    if(action.type === DATA_RECEIVED){
        return{...state, items: action.payload}
    }

    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                  }
        }
         else{
            addedItem.quantity = 1;           
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        return{
            ...state,
            addedItems: new_items,
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
        addedItem.quantity += 1;
        let mutateState = addedItem.quantity*addedItem.price
          return{
              ...state,
              total: mutateState,
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            return{
                ...state,
                addedItems: new_items,
            }
        }
        else {
            addedItem.quantity -= 1
            let mutateState = addedItem.quantity*addedItem.price
            return{
                ...state,
                total: mutateState,
            }
        }
        
    }

  if(action.type === CHANGE_QUANTITY){
    let addedItem = state.items.find(item=> parseInt(item.id) === parseInt(action.id));
    let newQuantity = parseInt(action.quantity);
    addedItem.quantity = newQuantity
    let mutateState = addedItem.quantity*addedItem.price
    return{
        ...state,
        total: mutateState,
    }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
