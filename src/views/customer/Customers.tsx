import React, { useState } from "react";
import { useQuery, gql } from "urql";
import moment from "moment";
import { DataTable, TextInput, Text } from "grommet";

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

export const Customers: React.FC<any> = () => {
  const [inputSearch, setInputSearch] = useState("");
  const search = "%" + inputSearch + "%";
  const [result] = useQuery({ query: SEARCH, variables: { search } });
  const { data, error, fetching } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const customers = data.customers;

  return (
    <div key="div">
      <TextInput
        autoFocus
        value={inputSearch}
        onChange={(event) => setInputSearch(event.target.value)}
        placeholder="Search customer"
      />
      <DataTable
        columns={[
          {
            property: "name",
            header: <Text>Name</Text>,
            primary: true,
          },
          {
            property: "email",
            header: <Text>Email</Text>,
            primary: true,
          },
          {
            property: "address",
            header: <Text>Location</Text>,
            primary: true,
            render: (customer) => (
              <Text>
                {customer.address.city +
                  ", " +
                  customer.address.state +
                  ", " +
                  customer.address.country}
              </Text>
            ),
          },
          {
            property: "phone",
            header: <Text>Phone</Text>,
            primary: true,
          },
          {
            property: "createdAt",
            header: <Text>Registration date</Text>,
            primary: true,
            render: (customer) => (
              <Text>{moment(customer.createdAt).format("DD/MM/YYYY")}</Text>
            ),
          },
        ]}
        data={customers}
      />
    </div>
  );
};
