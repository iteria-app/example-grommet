import React from "react";
import { useQuery, gql } from "urql";
import { CustomersTable } from "./CustomersTable";

const SEARCH = gql`
  query Search($search: String!) {
    customers(where: { name: { _ilike: $search } }, order_by: { name: asc }) {
      id
      email
      name
      phone
      address
      avatarUrl
      createdAt
      updatedAt
    }
  }
`;

export const CustomersLoader: React.FC<any> = ({ inputSearch }) => {
  const search = "%" + inputSearch + "%";
  const [result] = useQuery({ query: SEARCH, variables: { search } });
  const { data, error, fetching } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const customers = data.customers;

  return (
    <div>
      <CustomersTable customers={customers} />
    </div>
  );
};
