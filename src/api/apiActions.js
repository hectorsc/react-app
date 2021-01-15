import laravelapi from './laravelapi';

export const fetchCeos = async () => {
   let response = null;
   try {
      response = await laravelapi.get('/api/ceo');
      return response.data;
      
   } catch (e) {
      return response = e.name + e.message;
   }
};

export const fetchCeo = async id => {
   let response = null;
   try {
      response = await laravelapi.get(`/api/ceo/${id}`);
      return response.data;
      
   } catch (e) {
      return response = e.name + e.message;
   }
};

export const createCeo = async formValues => {
   try {
      const response = await laravelapi.post('/api/ceo', {...formValues});
      return response.data;
   } catch (e) {
      return e.response.data;
   }
};

export const editCeo = async (id, formValues) => {
   try {
      // patch no me dejó sale errores de CORS
      const response = await laravelapi.put(`/api/ceo/${id}`, formValues);
      return response.data;
   } catch (e) {
      return e.response.data;
   }
};

export const deleteCeo = async id => {
   await laravelapi.delete(`/api/ceo/${id}`);
};

export const tokenUser = async () => {
   try {
      const response = await laravelapi.get('/api/token');
      return response.data;
      
   } catch (e) {
      return e.response.data;
   }
};

export const logOut = async () => {
   try {
     const response = await laravelapi.post("/api/logout");
     return response.data;
   } catch (e) {
     return e.response.data;
   }
};

