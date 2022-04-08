import React from 'react'
import {TrashIcon, PencilIcon} from '@heroicons/react/outline';
import {
   
    useQuery,
    gql
  } from "@apollo/client";// import {getCategories} from '../graphql/queries/getQategories';

export function Categories() {
    const { loading, error, data } = useQuery(gql` 
       query getCategories {
  categories {
    id
    name
    description
  }
}
       `
      );
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  return (
    <div className="rounded mt-4 p-4">
        <h2> Categories : </h2>
        {data.categories.map(category => (
        <div className="border border-warning border-5 border-top-0 border-bottom-0 border-end-0 rounded p-2 mt-4 d-flex flex-column shadow-sm">
            <div>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            </div>
            <div className="d-flex justify-content-end col-md-12">
                <PencilIcon className="text-warning col-md-1"/>
                <TrashIcon className="text-danger col-md-1"/>
                {/* <button className="btn border-danger text-danger">delete</button> */}
                {/* <button className="btn btn-info">update</button> */}
            </div>
        </div>
        ))}
    </div>
  )
}
