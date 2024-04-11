import { useSelector } from "react-redux";
export const useGetCustomerBonsais = () => {
  const loading = useSelector((state) => state.customerBonsai?.loading);
  const getCustomerBonsais = useSelector(
    (state) => state.customerBonsai?.listCustomerBonsais.items
  );

  return {
    loading: loading,
    customerBonsais: getCustomerBonsais,
  };
};
