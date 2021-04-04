import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
}

const addPerson = (name, number) => {
  return axios.post(baseUrl, {name, number}).then((response) => response.data);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
}

const exportedObject = {getAll, addPerson, deletePerson, update};
export default exportedObject;
