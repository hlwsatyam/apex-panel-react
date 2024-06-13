import React, { useEffect, useState } from "react";
import "./Lead.css";
import Navbar from "../Navbar/Navbar";
import ResposeCard from "../Tab/ResposeCard";
import axios from "axios";
import { baseUrl } from "../../../Auth/Data";
import ResposeCardForNotification from "../Tab/ResponseCardForNotification";
function Lead({ isNotification }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("null");
  const [searchableText, setSearchableText] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [filter, page, searchableText]);
  const fetchData = async () => {
    const res = await axios.post(
      `${baseUrl}/api/v1/leadFromBackendDetails/${page}/${filter}`,
      {
        text: searchableText,
      }
    );
    if (res.status === 200) {
      setData(res.data);
    }
  };
  const updateSearchQr = (e) => {
    setSearchableText(e);
  };
  const updatePage = (e) => {
    if (e == "inc") {
      setPage(page + 1);
    } else {
      if (page != 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <div>
      <Navbar updateSearchQr={updateSearchQr} />
      <section>
        <div className="AgOriginatorsAllData">
          {data?.map((item, idx) =>
            isNotification ? (
              item.reapply || item.status === "null" ? (
                <ResposeCardForNotification
                  isNotification={isNotification}
                  item={item}
                  key={item.id || idx}
                />
              ) : (
                ""
              )
            ) : (
              <ResposeCard item={item} key={item.id || idx} />
            )
          )}

          <div className="DivOfButton">
            <button onClick={() => updatePage("dec")} className="ButtonOfPre">
              Previous
            </button>
            <button onClick={() => updatePage("inc")} className="ButtonOfNext">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Lead;
