const baseUrl = "http://localhost:3001";

export const addCollaborator = async (request) => {
  const response = await fetch(`${baseUrl}/addcollaborator/${request.noteId}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token"),
    },
    body: JSON.stringify(request),
  });
  return response.json();
};

export const removeCollaborator = async (request) => {
  const response = await fetch(
    `${baseUrl}/removecollaborator/${request.noteId}`,
    {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
      body: JSON.stringify(request),
    }
  );
  return response.json();
};
