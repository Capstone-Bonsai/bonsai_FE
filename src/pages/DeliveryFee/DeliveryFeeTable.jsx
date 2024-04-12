import { useEffect, useState } from "react";
import { getListDeliveryFee } from "../../utils/apiService";
import Loading from "../../components/Loading";

const DeliveryFeeTable = (props) => {
  const [listDeliveryFee, setList] = useState({});
  const [listAll, setListAll] = useState({});
  const [loading, setLoading] = useState(false);

  const [column, setColumn] = useState(4);
  useEffect(() => {
    setLoading(true);
    fetchDeliveryFee();
  }, []);
  const fetchDeliveryFee = (current) => {
    getListDeliveryFee()
      .then((data) => {
        setList(data.data.rows.slice(1));
        setListAll(data.data.rows);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div class="flex justify-center mt-10">
        <h1 class="text-2xl font-bold">
          Bảng giá về chi phí vận chuyển Bonsai (VND/km)
        </h1>
      </div>

      {loading ? (
        <>
          <div className="mt-20"></div>
          <Loading loading={loading} isRelative={true} />
          <div className="mb-20"></div>
        </>
      ) : (
        <div className="shadow-lg rounded-lg overflow-hidden mx-1 md:mx-10">
          <table className="w-half table-fixed  mx-auto mt-10 mb-20 ">
            <thead>
              <tr className="bg-gray-100">
                {listAll && listDeliveryFee.length > 0 ? (
                  listAll[0].items.map((temp, index) => (
                    <th className="w-1/4 py-4 px-6 text-left text-[#3a9943] font-bold">
                      {temp}
                    </th>
                  ))
                ) : (
                  <></>
                )}
              </tr>
            </thead>
            <tbody className="bg-white">
              {listDeliveryFee &&
                listDeliveryFee.length > 0 &&
                listDeliveryFee.map((item, index) => {
                  return (
                    <tr>
                      {item.items.map((temp, index) => (
                        <td className="py-4 px-6 border-b border-gray-200">
                          {temp}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DeliveryFeeTable;
