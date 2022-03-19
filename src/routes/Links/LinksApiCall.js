import { API } from "../../backend";

// get all products
export const getSites = () => {
  return fetch(`${API}sites`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// create a product
export const createSites = (userId, token, site) => {
  const formData = new FormData();
  formData.append("picture", site.picture);
  formData.append("name", site.name);
  formData.append("site", site.site);
  formData.append("userId", site.userId);
  formData.append("password", site.password);
  formData.append("points", site.points);
  formData.append("fetchMinimum", site.fetchMinimum);
  formData.append("fancyMinimum", site.fancyMinimum);
  console.log(formData);

  return fetch(`${API}site/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "mulitpart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((err) => console.log(err));
};

// Update a product
export const updateSites = (siteId, userId, token, side) => {
  const formData = new FormData();
  formData.append("picture", side.picture);
  formData.append("name", side.name);
  formData.append("site", side.site);
  formData.append("userId", side.userId);
  formData.append("password", side.password);
  formData.append("points", side.points);
  formData.append("fetchMinimum", side.fetchMinimum);
  formData.append("fancyMinimum", side.fancyMinimum);
  // console.log(formData);

  return fetch(`${API}site/${siteId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "mulitpart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((err) => console.log(err));
};

// delete the product
export const deleteSite = (siteId, userId, token) => {
  return fetch(`${API}site/${siteId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
