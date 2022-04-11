import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { useQuery,useMutation} from "@apollo/client";
import {GET_CATEGORIES} from "../graphql/queries/category";
import {DELETE_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY} from "../graphql/mutations/category";
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

export function Categories() {

  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modal_data, set_modal_data] = useState(null);

  const name = useRef("");
  const description = useRef("");
  const nameAdd = useRef("");
  const descriptionAdd = useRef("");


  const [updateCategory, { loading:loadingUpdate ,error:errorUpdate,refetch:dataUpdate } ] = useMutation(UPDATE_CATEGORY, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_CATEGORIES}]
  });

  const [deleteCategory, { loading:loadingDelete, error:errorDelete, data:dataDelete } ] = useMutation(DELETE_CATEGORY, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_CATEGORIES}]
  });
  const [newCategory, { loading:loadingAdd, error:errorAdd, data:dataAdd } ] = useMutation(ADD_CATEGORY, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{query: GET_CATEGORIES}]
  });
  const { loading, error, data} = useQuery(GET_CATEGORIES);

  return (
    <div className="rounded mt-4 p-4 d-flex flex-column shadow-sm">
      <button onClick={()=>{setIsOpen(true)}} className="p-2 align-self-end btn text-info border border-info">+ New Category</button>
      <h2 className="border border-info border-5 border-top-0 border-bottom-0 border-end-0 rounded p-2"> Categories : </h2>

      {loading && <p>Loading...</p>}
      {error && <p>Error :{error.message}</p>}

      
      {/* {loadingDelete && <p>Submitting...</p>} */}
      {errorDelete && <p>Error! ${errorDelete.message}</p>}

      {/* {loadingAdd && <p>Submitting...</p>} */}
      {errorAdd && <p>Error! ${errorAdd.message}</p>}
      
      {errorUpdate && <p>Error! ${errorUpdate.message}</p>}
      {/* {loadingUpdate && <p>Submitting...</p>} */}

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
        {data?.categories.map((category) => (
          <tr key={category.id}>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td className="d-flex">
              <PencilIcon className="text-info" onClick={() => { setIsOpenEdit(true); set_modal_data(category); }}/>
              <TrashIcon className="text-danger" onClick={() =>deleteCategory({variables:{id : category.id}})}/>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      {/* {data.categories.map((category) => (
        <div key={`category-key#${category.id}`} className="border border-info border-5 border-top-0 border-bottom-0 border-end-0 rounded p-2 mt-4 d-flex flex-column shadow-sm">
          <div>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
          <div className="d-flex align-self-end col-md-2">
            <PencilIcon className="text-info col-md-4" onClick={() => { setIsOpenEdit(true); set_modal_data(category); }}/>
            <TrashIcon className="text-danger col-md-4" onClick={() =>deleteCategory({variables:{id : category.id}})}/>
          </div>
        </div>
      ))} */}

      <Modal isOpen={modalIsOpenEdit} onRequestClose={() => { setIsOpenEdit(false); }} style={customStyles}>
        <div>
          <h2 className="text-info">Update Category {modal_data?.name}</h2>
          <form
            className="mt-4"
            onSubmit={(e)=>{
              e.preventDefault();
              updateCategory({
              variables: {
                input:{
                  id : modal_data?.id,
                  name : name.current.value,
                  description : description.current.value,
                }
              }});
              setIsOpenEdit(false);}}>
            <div className="form-group mt-4 mb-4">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" ref={name} defaultValue={modal_data?.name}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" ref={description} defaultValue={modal_data?.description} />
            </div>
            <div className="d-flex justify-content-end col-md-12 mt-4">
              <button className="btn btn-outline-info text-info m-2" onClick={() => {setIsOpenEdit(false); }}> Cancel </button>
              <button className="btn btn-outline-info text-info m-2" type="submit"> Update </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={modalIsOpen} onRequestClose={() => { setIsOpen(false); }} style={customStyles}>
        <div>
          <h2 className="text-info">New Category :</h2>
          <form
            className="mt-4"
            onSubmit={(e)=>{e.preventDefault();
               newCategory({
              variables: {
                input:{
                  name : nameAdd.current.value,
                  description : descriptionAdd.current.value,
                }
              }});
              setIsOpen(false);
              }}>
            <div className="form-group mt-4 mb-4">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" ref={nameAdd}/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" ref={descriptionAdd}/>
            </div>
            <div className="d-flex justify-content-end col-md-12 mt-4">
              <button className="btn btn-outline-info text-info m-2" onClick={() => {setIsOpen(false); }}> Cancel </button>
              <button className="btn btn-outline-info text-info m-2" type="submit"> Add </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
