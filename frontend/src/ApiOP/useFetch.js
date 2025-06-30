import { useState } from "react";
const useFetch = () => {
  const [responseData, setResponseData] = useState([]);
  const [isLoadingApi, setisLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const baseURI = "http://localhost:8000";



  const serverRequest = (serverRequestParam) => {
    const fetchURL = baseURI + serverRequestParam.apiUrl;
    setApiKey(serverRequestParam.apikey);
    setisLoading(false);
    fetch(fetchURL, serverRequestParam)
      .then((response) => {
        return response.json();
      })
      .then((respdata) => {
        setResponseData(respdata);
        setisLoading(true);
      })
      .catch((err) => {
        setisLoading(false);
        setFetchError(err.message);
      });
  };

  return { responseData, isLoadingApi, apiKey, fetchError, serverRequest };
};




export default useFetch;
