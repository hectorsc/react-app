import React from 'react';
import CeoForm from './CeoForm';
import { createCeo } from '../../api/apiActions';


class CeoCreate extends React.Component {

   onSubmit = async formValues => {
      return await createCeo(formValues);
   }

   render() {
      return (
         <div> 
            <h1 className="ui header">Crear Empresa</h1>
            <div className="ui segment">
               <CeoForm onSubmit={this.onSubmit} />
            </div>  
         </div>
      );
   }
};

export default CeoCreate;