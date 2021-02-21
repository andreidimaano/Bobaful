import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type ProductArguments = {
  name: Scalars['String'];
  fanFav?: Maybe<Scalars['Boolean']>;
  chefFav?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
};

export type UpdateProductArguments = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  fanFav?: Maybe<Scalars['Boolean']>;
  chefFav?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type DeleteProductArguments = {
  productId: Scalars['ID'];
};

export type ItemArguments = {
  quantity: Scalars['Int'];
  product: Scalars['ID'];
  price: Scalars['Float'];
  ounces: Scalars['Int'];
};

export type DeleteItemArguments = {
  itemId: Scalars['ID'];
};

export type OrderArguments = {
  items: Array<Scalars['ID']>;
  totalPrice: Scalars['Float'];
  user: Scalars['ID'];
};

export type UpdateOrderArguments = {
  orderId?: Maybe<Scalars['ID']>;
  userId?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Maybe<ItemArguments>>>;
  quantity?: Maybe<Scalars['Int']>;
  itemId?: Maybe<Scalars['ID']>;
};

export type DeleteOrderArguments = {
  orderId: Scalars['ID'];
};

export type UserArguments = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  password: Scalars['String'];
  orders?: Maybe<Array<Scalars['ID']>>;
};

export type DeleteUserArguments = {
  userId: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  fanFav?: Maybe<Scalars['Boolean']>;
  chefFav?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  product: Product;
  price: Scalars['Float'];
  ounces: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  items: Array<Item>;
  totalPrice: Scalars['Float'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  orders: Array<Order>;
};

export type AuthenticationError = {
  __typename?: 'AuthenticationError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<AuthenticationError>>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  items: Array<Item>;
  orders: Array<Order>;
  users: Array<User>;
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  updateProduct: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteAllProducts: Scalars['Boolean'];
  createItem: Item;
  deleteItem: Scalars['Boolean'];
  deleteAllItems: Scalars['Boolean'];
  createOrder: Order;
  updateOrder: Scalars['Boolean'];
  deleteOrder: Scalars['Boolean'];
  deleteAllOrders: Scalars['Boolean'];
  createUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  deleteAllUsers: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  args?: Maybe<ProductArguments>;
};


export type MutationUpdateProductArgs = {
  args?: Maybe<UpdateProductArguments>;
};


export type MutationDeleteProductArgs = {
  args?: Maybe<DeleteProductArguments>;
};


export type MutationCreateItemArgs = {
  args?: Maybe<ItemArguments>;
};


export type MutationDeleteItemArgs = {
  args?: Maybe<DeleteItemArguments>;
};


export type MutationCreateOrderArgs = {
  args?: Maybe<OrderArguments>;
};


export type MutationUpdateOrderArgs = {
  args?: Maybe<UpdateOrderArguments>;
};


export type MutationDeleteOrderArgs = {
  args?: Maybe<DeleteOrderArguments>;
};


export type MutationCreateUserArgs = {
  args?: Maybe<UserArguments>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  args?: Maybe<DeleteUserArguments>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AuthenticationError' }
      & Pick<AuthenticationError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'phone' | 'email'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'AuthenticationError' }
      & Pick<AuthenticationError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'phone'>
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);


export const CreateUserDocument = gql`
    mutation createUser($name: String!, $email: String!, $password: String!, $phone: String!) {
  createUser(
    args: {name: $name, email: $email, password: $password, phone: $phone}
  ) {
    errors {
      field
      message
    }
    user {
      id
      name
      phone
      email
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      name
      email
      phone
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    name
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};