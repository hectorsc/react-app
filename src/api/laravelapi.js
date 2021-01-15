import axios from 'axios';
const apiPath = 'http://laravel-backend-api.test'

export default axios.create({
   baseURL: apiPath,
   headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
   }
});

export const login = async formValues => {
   try {
      const response = await axios.post(`${apiPath}/api/login`, { ...formValues });
      return response.data;
      
   } catch (e) {
      return e.response.data; 
   }
};

export const register = async formValues => {
   try {
      const response = await axios.post(`${apiPath}/api/register`, { ...formValues });
      return response.data;
   } catch (e) {
      return e.response.data;
   }
};

