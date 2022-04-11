import React, { useState ,useRef} from "react";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { useQuery, gql,useMutation} from "@apollo/client";
import {GET_PRODUCTS} from "../graphql/queries/product";
import { GET_CATEGORIES } from "../graphql/queries/category";
import {DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT} from "../graphql/mutations/product";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export function Products() {
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal_data, set_modal_data] = useState(null);

  const name = useRef("");
  const description = useRef("");
  const price = useRef("");
  const quantity = useRef("");
  const onSale = useRef("");
  const categoryId = useRef("");

  const nameAdd = useRef("");
  const descriptionAdd = useRef("");
  const quantityAdd = useRef("");
  const priceAdd = useRef("");
  const onSaleAdd = useRef("");
  const categoryIdAdd = useRef("");

  const [updateProduct, { loading:loadingUpdate, error:errorUpdate, data:dataUpdate } ] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_PRODUCTS}]
  });
  const [deleteProduct, { loading:loadingDelete, error:errorDelete, data:dataDelete } ] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_PRODUCTS}]
  });
  const [newProduct, { loading:loadingAdd, error:errorAdd, data:dataAdd } ] = useMutation(ADD_PRODUCT, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_PRODUCTS}]
  });
  
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { loading:loadingCategories, error:errorCategories, data:dataCategories} = useQuery(GET_CATEGORIES);

  return (
    <div className="rounded mt-4 p-4 d-flex flex-column shadow-sm">
      <button onClick={()=>{setIsOpen(true)}} className="p-2 align-self-end btn text-info border border-info">+ New Product</button>
      <h2 className="border border-info border-5 border-top-0 border-bottom-0 border-end-0 rounded p-2"> Products : </h2>
  
      {loading && <p>Loading...</p>}
      {error && <p>Error :{error.message}</p>}

      {/* {loadingUpdate && <p>Submitting...</p>} */}
      {errorUpdate && <p>Error! ${errorUpdate.message}</p>}

      {/* {loadingDelete && <p>Submitting...</p>} */}
      {errorDelete && <p>Error! ${errorDelete.message}</p>}

      {/* {loadingAdd && <p>Submitting...</p>} */}
      {errorAdd && <p>Error! ${errorAdd.message}</p>}

      {loadingCategories && <p>Loading...</p>}
      {errorCategories && <p>Error :{errorCategories.message}</p>}
      
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">On Sale</th>
            <th scope="col">Action</th>            
          </tr>
        </thead>
        <tbody>
          {data?.products.map((product) => (

            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
              <td className="text-center">{product.onSale ? (<p className="border border-success text-success text-center rounded">Yes</p>): (<p className="border border-danger text-danger text-center rounded">No</p>)}</td>
              <td className="d-flex">
                <PencilIcon className="text-info" onClick={() => { setIsOpenEdit(true); set_modal_data(product);}}/>
                <TrashIcon className="text-danger" onClick={() =>deleteProduct({variables:{id : product.id}})}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={() => {
          setIsOpenEdit(false);
        }}
        style={customStyles}
      >
         <div className="col-md-12">
          <h2 className="text-info">Update Product {modal_data?.name}</h2>
          <form className="mt-4 p-4"onSubmit={(e)=>{e.preventDefault(); updateProduct({
              variables: {
                input:{
                  id: modal_data?.id,
                  name : name.current.value,
                  description : description.current.value,
                  quantity : quantity.current.value,
                  price : price.current.value,
                  categoryId : categoryId.current.value,
                  onSale : onSale.current.value == "false" ? false : true
                }}});
                setIsOpenEdit(false);
                }}>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" ref={name} defaultValue={modal_data?.name} />
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" ref={description} defaultValue={modal_data?.description} />
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" id="quantity" ref={quantity} defaultValue={modal_data?.quantity} />
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" id="price" ref={price} defaultValue={modal_data?.price}/>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" ref={categoryId}>
                  <option value={modal_data?.category.id}>{modal_data?.category.name}</option>
                  {dataCategories?.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="onSale">On Sale</label>
                <select className="form-control" id="onSale" ref={onSale}>
                  {modal_data?.onSale ? (<option value="true">Yes</option>) : (<option value="false">No</option>)}
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="d-flex justify-content-end col-md-12 mt-4">
                <button className="btn btn-outline-info text-info m-2" onClick={() => {setIsOpen(false); }}> Cancel </button>
                <button className="btn btn-outline-info text-info m-2" type="submit"> Update </button>
              </div>
            </form>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={customStyles}
      >
        <div className="col-md-12">
            <h2 className="text-info">New Product</h2>
            <form className="mt-4 p-4"onSubmit={(e)=>{e.preventDefault(); newProduct({
              variables: {
                input:{
                  name : nameAdd.current.value,
                  description : descriptionAdd.current.value,
                  quantity : quantityAdd.current.value,
                  price : priceAdd.current.value,
                  categoryId : categoryIdAdd.current.value,
                  onSale : onSaleAdd.current.value == "false" ? false : true
                }}});
                setIsOpen(false);
                }}>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" ref={nameAdd}/>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" ref={descriptionAdd}/>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="quantity">Quantity</label>
                <input type="number" className="form-control" id="quantity" ref={quantityAdd}/>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="price">Price</label>
                <input type="number" className="form-control" id="price" ref={priceAdd}/>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="category">Category</label>
                <select className="form-control" id="category" ref={categoryIdAdd}>
                  {dataCategories?.categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-4 mb-4">
                <label htmlFor="onSale">On Sale</label>
                <select className="form-control" id="onSale" ref={onSaleAdd}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="d-flex justify-content-end col-md-12 mt-4">
                <button className="btn btn-outline-info text-info m-2" onClick={() => {setIsOpen(false); }}> Cancel </button>
                <button className="btn btn-outline-info text-info m-2" type="submit"> Add </button>
              </div>
            </form>
          
        </div>
      </Modal>
    </div>
  )
}
