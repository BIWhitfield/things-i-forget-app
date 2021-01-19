---
path: /use-get/index
date: 2021-01-19T18:29:44.232Z
title: useGet ReactJS Hook
description: An implementation of a basic useGet hook which utilises useReducer
  and useEffect
---
The functionality is in one file here but the reducer, actions and the hook itself can obviously be refactored to individual files.

First off set up some constants. I've developed a new found love of setting a `status` instead of using `loading` type booleans in my React components. First there are some action creator constants and then the status constants. I use the status constants to render specific states whilst the useGet moves through the async call. Cheers to [Kent C. Dodds](https://twitter.com/kentcdodds) [Epic React](https://epicreact.dev) course for the approach. You should check that out. It's absolutely boss.

```javascript
// constants.js

// action type consts
export const REQUEST_PROCESSING = 'REQUEST_PROCESSING';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const RESET_REQUEST = 'RESET_REQUEST';
export const REFETCH_REQUEST = 'REFETCH_REQUEST';

// Status consts
export const IDLE = 'IDLE';
export const PROCESSING = 'PROCESSING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
```

Then in useGet.js we have...

```javascript
// useGet.js

import { useReducer, useEffect } from "react";
import {
  IDLE,
  PROCESSING,
  SUCCESS,
  FAILURE,
  REQUEST_PROCESSING,
  REQUEST_FAILED,
  REQUEST_SUCCESSFUL,
  RESET_REQUEST,
  REFETCH_REQUEST,
} from "./constants";

// Action creators
export const requestProcessing = () => ({
  type: REQUEST_PROCESSING,
});

export const requestSuccessful = ({ data }) => ({
  type: REQUEST_SUCCESSFUL,
  data,
});

export const requestFailed = ({ error }) => ({
  type: REQUEST_FAILED,
  error,
});

export const requestReset = () => ({
  type: RESET_REQUEST,
});

export const requestRefetch = () => ({
  type: REFETCH_REQUEST,
});

// Set an initial state
const initialState = {
  status: IDLE,
  data: null,
  error: null,
  refetch: false,
};

// Reducer
export const reducer = (state, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case REQUEST_PROCESSING:
      return {
        ...nextState,
        status: PROCESSING,
      };

    case REQUEST_SUCCESSFUL:
      return {
        ...nextState,
        status: SUCCESS,
        error: null,
        data: action.data,
      };

    case REQUEST_FAILED:
      return {
        ...nextState,
        status: FAILURE,
        error: action.error,
      };

    case REFETCH_REQUEST:
      return {
        ...nextState,
        refetch: !nextState.refetch,
      };

    case RESET_REQUEST:
      return initialState;

    default:
      return nextState;
  }
};

// Hook
export const useGet = ({ url, options }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const { refetch } = state;

  const attemptRefetch = () => setState(requestRefetch());

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setState(requestProcessing());

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          ...options,
        });

        if (!response.ok) {
          if (refetch) {
            setState(requestRefetch());
          }
          setState(
            requestFailed({
              error: `${response.status} ${response.statusText}`,
            })
          );
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (refetch) {
          setState(requestRefetch());
        }
        setState(requestSuccessful({ data }));
      } catch (e) {
        if (!abortController.signal.aborted) {
          setState(requestFailed({ error: e.message }));
        }
        if (refetch) {
          setState(requestRefetch());
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [refetch]);

  return { state, refetch: attemptRefetch };
};

```

You use it in a component like so...

```jsx
// ExampleComponent.jsx

import React from "react";
import { useGet } from "../../hooks/useGet";

import { PROCESSING, SUCCESS, FAILURE } from "../../hooks/constants";

const ExampleComponent = () => {
  const { state, refetch } = useGet({ url, options: {} });
  const { status, data, error } = state;

  if (status === PROCESSING) {
    return <div>Loading</div>;
  }

  if (status === FAILURE) {
    return <div>{`Error fetching data: ${error}`}</div>;
  }

  if (status === SUCCESS) {
    // do some shit with the data if you want

    return (
      <div>
        {data}
      </div>
    );
  }

  // we'll never get here lad
  return null
};

export default ExampleComponent;
```