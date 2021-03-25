import { createClient, Provider } from "urql";
import { Customers } from "./Customers";

export const database = () => {
  const client = createClient({
    url: "https://iteria-app-example01.herokuapp.com/v1/graphql",
  });
  return (
    <div>
      <Provider value={client}>
        <Customers />
      </Provider>
    </div>
  );
};
