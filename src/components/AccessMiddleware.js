import { useState, useEffect } from 'react';
import { tokenUser } from '../api/apiActions';

const AccessMiddleware = () => {

   const [resources, setResources] = useState(null);
   const [loading, setLoading] = useState(true); 
    
   useEffect(() => {
      (async () => {
         const response = await tokenUser();
         response.message ? setResources(null) : setResources(response);
         setLoading(false);
      })();

   }, []);

   return [resources, loading];
};

export default AccessMiddleware;