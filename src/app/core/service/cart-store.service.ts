import { Injectable, signal } from "@angular/core";
import { CartItem } from "../model/cart/cart-item";
import { CartState, initialState } from "../model/cart/cart-state";
import { Store } from "../store";

@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState>{

    constructor() {
        super(initialState);
    }
 
    public grandTotal = signal(0);

    public addCartItem(cartItemToAdd: CartItem) {
        console.log('[Cart] Add Cart Item');
        const newState = {
            ...this.state, //cartItems
            cartItems: [...this.state.cartItems, cartItemToAdd]
        };
        this.setState(newState);
        this.grandTotal.update(value=> value + cartItemToAdd.itemTotal);
    }

    public clearCart() {
        console.log('[Cart] Clear Cart Item');
        const newState = initialState;
        this.setState(newState);
        this.grandTotal.set(0);
    }

    // public restoreCart(stateToRestore: CartState) {
    //     console.log('[Cart] Restore Cart Item');
    //     this.setState(stateToRestore);
    // }

    public removeCartItem(cartItemToRemove: CartItem) {
        console.log("productId >>> remove >> ",cartItemToRemove.productId);
        cartItemToRemove.isInCart = false;
        console.log('[Cart] Remove Cart Item');
        const newState = {
            ...this.state, //cartItems
            cartItems: this.state.cartItems.filter(
                cartItem => cartItem.productId !== cartItemToRemove.productId
            )
        };
        this.setState(newState);
        this.grandTotal.update(value=> value - cartItemToRemove.itemTotal);
    }

    public updateCartItem(cartItemToUpdate: CartItem) {
        console.log('[Cart] Update Cart Item');
        this.state.cartItems.forEach(item=>{
            if(item.productId === cartItemToUpdate.productId){
                this.grandTotal.update(value=> value - item.itemTotal);
            }
        });
        cartItemToUpdate.itemTotal = cartItemToUpdate.quantity * cartItemToUpdate.price;
        this.grandTotal.update(value=> value + cartItemToUpdate.itemTotal);
        const newState = {
            ...this.state, //cartItems
            cartItems: this.state.cartItems.map(
                cartItem => cartItem.productId === cartItemToUpdate.productId ? cartItemToUpdate : cartItem
            )
        };
        this.setState(newState);
    }
}
