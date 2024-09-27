import { useState, useEffect } from "react";
import axios from "axios";

// TODO: possibly add depends array in future
export function useAxios(url, { method, headers = null, data = null }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState({});

  const fetchData = async () => {
    return axios
      .request({
        url,
        method,
        headers,
        data,
      })
      .then((res) => setResponse(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("THIS IS A REFETCH!!!!");
    fetchData();
  }, []);

  useEffect(() => {
    console.log("THIS IS A RELOAD!!!!!!!!");
    const data = fetchData();
    console.log("ACTUAL DATA: " + JSON.stringify(response));
  }, [reload]);

  const refetch = () => setReload({});

  return { response, error, loading, refetch };
}
