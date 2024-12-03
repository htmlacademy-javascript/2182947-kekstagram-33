import {BASE_URL,Route,METHOD_POST} from './api-data';


const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      onFail();
    }
    const posts = await response.json();
    onSuccess(posts);
  } catch (error) {
    onFail();
  }
};

const sendData = async ({onSuccess, onFail, onHandlerFinally, body}) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: METHOD_POST,
      body,
    });
    if (!response.ok) {
      onFail();
    } else {
      onSuccess();
    }
  } catch (error) {
    onFail();
  } finally {
    onHandlerFinally();
  }
};

export {getData,sendData};
