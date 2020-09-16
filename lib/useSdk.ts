import { getSdk } from "../generated/graphql";
import useGqlClient from "../graphql/client";

const useSdk = () => {
  const client = useGqlClient();
  const sdk = getSdk(client);

  return sdk;
};

export default useSdk;
