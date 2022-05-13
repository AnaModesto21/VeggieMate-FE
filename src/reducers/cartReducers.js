import { ADD_TO_CART } from "../constants/cartConstants";
import { REMOVE_ITEM_CART } from "../constants/cartConstants";
import { SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import { CLEAR_CART } from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const doesItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (doesItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === doesItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalQuantity: 0,
      };

    default:
      return state;
  }
};
