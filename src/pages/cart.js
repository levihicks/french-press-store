import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { editQuantity, removeItem } from '../store/cartSlice';
import Button from '../components/button';

const CREATE_CHECKOUT = gql`
  mutation ($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        webUrl
      }
    }
  }
`;

const StyledCart = styled.div``;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
  margin-bottom: 1rem;
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  align-items: flex-start;
  justify-content: space-between;
  width: 9rem;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-left: 0;
    & > div {
      margin-bottom: 1rem;
    }
  }
`;

const QuantityButtons = styled.div`
  display: flex;
  & > div {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid;
  }

  & > div:nth-child(2) {
    border-left: none;
    border-right: none;
    cursor: default;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin: 1rem 0;
  }
`;

const SubtotalText = styled.div`
  margin-right: 4px;
  @media only screen and (min-width: ${(props) => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const CheckoutButton = styled.button`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  border: none;
  font-weight: 700;
  padding: 1rem 3rem;
  text-transform: uppercase;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    background: ${(props) => props.theme.colors.darkGray};
  }
`;

const GrandTotal = styled.div`
  font-size: ${(props) => props.theme.fontSizes.md};
`;

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { backgroundColor, textColor } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [createCheckout, { data, error }] = useMutation(CREATE_CHECKOUT);

  if (data) window.location.href = data.checkoutCreate.checkout.webUrl;
  if (error) console.log(error);

  const checkoutClickHandler = () => {
    createCheckout({
      variables: {
        input: {
          lineItems: cart.map((el) => {
            return { variantId: el.variantId, quantity: el.quantity };
          }),
        },
      },
    });
  };

  const quantityButtonHandler = (variantId, newQuantity) => {
    dispatch(editQuantity({ variantId, newQuantity }));
  };

  if (cart.length === 0)
    return <div style={{ textAlign: 'center' }}>No items in cart.</div>;

  return (
    <StyledCart>
      {cart.map((item) => (
        <CartItem key={item.variantId}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <img src={item.imageUrl} alt="" height={200} width={200} />
            <Column>
              <div>
                <div>{item.title}</div>
                <div>${item.price}</div>
              </div>
              <Button click={() => dispatch(removeItem(item.variantId))}>
                Remove
              </Button>
            </Column>
          </div>
          <QuantityButtons>
            <div
              onClick={() =>
                quantityButtonHandler(item.variantId, item.quantity - 1)
              }
            >
              -
            </div>
            <div>{item.quantity}</div>
            <div
              onClick={() =>
                quantityButtonHandler(item.variantId, item.quantity + 1)
              }
            >
              +
            </div>
          </QuantityButtons>
          <div style={{ display: 'flex' }}>
            <SubtotalText>Subtotal:</SubtotalText>$
            {(item.quantity * item.price).toFixed(2)}
          </div>
        </CartItem>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>TOTAL</div>
        <GrandTotal>
          $
          {cart
            .reduce((total, el) => total + el.price * el.quantity, 0)
            .toFixed(2)}
        </GrandTotal>
      </div>
      <div style={{ textAlign: 'right', marginTop: '1rem' }}>
        <CheckoutButton
          textColor={backgroundColor}
          backgroundColor={textColor}
          onClick={checkoutClickHandler}
        >
          Checkout
        </CheckoutButton>
      </div>
    </StyledCart>
  );
};

export default Cart;
