import { useState } from "react";
import { createClient, Provider } from "urql";
import { TextInput } from "grommet";
import { CustomersLoader } from "./CustomersLoader";

export const CustomerListView = () => {
  const client = createClient({
    url: "https://iteria-app-example01.herokuapp.com/v1/graphql",
  });

  const [inputSearch, setInputSearch] = useState("");

  return (
    <div>
      <TextInput
        autoFocus
        value={inputSearch}
        onChange={(event) => setInputSearch(event.target.value)}
        placeholder="Search customer"
      />
      <Provider value={client}>
        <CustomersLoader inputSearch={inputSearch} />
      </Provider>
    </div>
  );
};
