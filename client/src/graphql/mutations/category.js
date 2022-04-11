import {gql} from "@apollo/client";

export const DELETE_CATEGORY = gql`
mutation deleteCategory($id: ID!) {
deleteCategory(id: $id) {
  code
  success
  message
}}`
export const ADD_CATEGORY = gql`
mutation addCategory($input: addCategoryInput) {
addCategory(Input: $input) {
  code
  success
  message
  category {
    id
    name
    description
}}}`
export const UPDATE_CATEGORY = gql`
mutation updateCategory($input: updateCategoryInput) {
updateCategory(Input: $input) {
success
message
}}`

