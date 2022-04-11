import {gql} from "@apollo/client";

export const ADD_PRODUCT = gql`
mutation addProduct($input: addProductInput) {
  addProduct(Input: $input) {
    code
    success
    message
    product {
      id
      name
      description
      quantity
      price
      onSale
      category {
        name
      }
    }
  }
}
`
export const DELETE_PRODUCT = gql`
mutation DeleteProduct($id: ID!) {
deleteProduct(id: $id) {
  code
  success
  message
}
}
`
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($input: updateProductInput) {
updateProduct(Input: $input) {
  code
  success
  message
  product {
    name
    description
    quantity
    price
    onSale
    category {
      name
    }
  }
}
}`