import request from "./request";

export const fetchUsers = (successAction, failureAction) => {
    return request('admin/users', {}, successAction, failureAction, true);
};

export const editUser = (params, successAction, failureAction) => {
    return request(`admin/users/${params.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    },successAction,failureAction, true);
};

export const deleteUser = (userId,successAction,failureAction) => {
    return request(`admin/users/${userId}`,{
        method: 'DELETE',
    },successAction,failureAction, true);
};

export const getProfile = (id , successAction, failureAction) => {
  return request(`admin/users/${id}`, {}, successAction, failureAction, true);
};

export const updateProfile = (params, id, successAction, failureAction) => {
  return request(`admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  }, successAction, failureAction,true);
};

export const createUser = (params, successAction, failureAction) => {
  return request('admin/users/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user: params})
  },successAction, failureAction, true);
};