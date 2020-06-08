import axios from "axios";

const baseUrl = "http://localhost:3001";

export function login(request, callback) {
  axios
    .post(baseUrl + "/login", request)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function register(request, callback) {
  axios
    .post(baseUrl + "/register", request)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function verify(request, callback) {
  axios
    .post(baseUrl + "/verifyuser", request, {
      headers: { token: request.token },
    })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function forgot(request, callback) {
  axios
    .post(baseUrl + "/forgotpassword", request)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function reset(request, callback) {
  axios
    .post(baseUrl + "/resetpassword", request, {
      headers: { token: request.token },
    })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function create_note(request, callback) {
  axios
    .post(baseUrl + "/note", request, {
      headers: { token: sessionStorage.getItem("token") },
    })
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function getAllNotes(callback) {
  axios
    .get(baseUrl + "/note", {
      headers: { token: sessionStorage.getItem("token") },
    })
    .then((data) => {
      return callback(null, data);
    })
    .catch((error) => {
      return callback(error);
    });
}

export function updateNote(request) {
  let response = axios.put(baseUrl + "/note/" + request.noteId, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function deleteNote(request) {
  let response = axios.delete(baseUrl + "/note/" + request.noteId, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function getAllLabels() {
  let response = axios.get(baseUrl + "/label", {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function createLabel(request) {
  let response = axios.post(baseUrl + "/label", request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function updateLabel(request) {
  let response = axios.put(baseUrl + "/label/" + request._id, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function deleteLabel(request) {
  let response = axios.delete(baseUrl + "/label/" + request._id, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function addLabelToNote(request) {
  let response = axios.put(baseUrl + "/addlabel/" + request._id, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function removeLabelFromNote(request) {
  let response = axios.put(baseUrl + "/removelabel/" + request._id, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function search(request) {
  let response = axios.post(baseUrl + "/search", request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function profileUpload(request) {
  let response = axios.post(baseUrl + "/imageupload", request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function addReminder(request) {
  let response = axios.post(baseUrl + "/remainder/" + request.noteId, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export function removeReminder(request) {
  let response = axios.put(baseUrl + "/remainder/" + request.noteId, request, {
    headers: { token: sessionStorage.getItem("token") },
  });
  return response;
}

export const isLogin = () => {
  if (sessionStorage.getItem("token")) {
    return true;
  }
  return false;
};
