import { useEffect, useReducer, useState } from "react";
import axios from "axios";

import { IHit } from "../type/data";

const FETCH_INIT = "FETCH_INIT";
const FETCH_FAIL = "FETCH_FAIL";
const FETCH_SUCCESS = "FETCH_SUCCESS";

const coStateReducer = (
  state: {
    isLoading: boolean;
    isError: string;
    data: IHit[];
  },
  action:
    | { type: typeof FETCH_INIT }
    | { type: typeof FETCH_FAIL; payload: string }
    | { type: typeof FETCH_SUCCESS; payload: IHit[] },
) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, isError: "" };
    case FETCH_FAIL:
      return { ...state, isLoading: false, isError: action.payload };
    case FETCH_SUCCESS:
      return { isLoading: false, isError: "", data: action.payload };
    default:
      throw new Error("Unexpected case in reducer action type!");
  }
};

function useFetchData({
  initialData,
  watchedUrl,
}: {
  initialData: IHit[];
  watchedUrl: string;
}) {
  const [coState, dispatchCoState] = useReducer(coStateReducer, {
    isLoading: false,
    isError: "",
    data: initialData,
  });

  const [url, setUrl] = useState(watchedUrl);

  useEffect(() => {
    const fetchData = async () => {
      dispatchCoState({ type: FETCH_INIT });
      try {
        const result = await axios.get(url);
        // console.log(result);
        // Unless using zod state schema library
        // Taylor result to fit T state type
        dispatchCoState({ type: FETCH_SUCCESS, payload: result.data.hits });
      } catch (err) {
        console.log(err);
        let errorMsg = "";
        if (err instanceof Error) {
          errorMsg = err.message;
        } else {
          errorMsg = "Something went wrong!";
        }
        dispatchCoState({ type: FETCH_FAIL, payload: errorMsg });
      }
    };
    fetchData();
  }, [url]);

  return {
    setUrl,
    fetcher: {
      isLoading: coState.isLoading,
      isError: coState.isError,
      data: coState.data,
    },
  };
}

export default useFetchData;
