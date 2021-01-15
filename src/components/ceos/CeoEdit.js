import React from 'react';
import CeoForm from './CeoForm';
import { fetchCeo, editCeo } from '../../api/apiActions';
import _ from 'lodash';

class CeoEdit extends React.Component {

   state = { response: [] };

   componentDidMount = async () => {
      const response = await fetchCeo(this.props.match.params.id); //el id viene en el props por defecto
      this.setState({ response : response.ceo });
   }

   onSubmit = async formValues => {
      return await editCeo(this.state.response.id, formValues);
   }

   render() {
      const initialValues = _.pick(this.state.response, 'name', 'company_name', 'year', 'company_headquarters', 'what_company_does');
      return (
         <div> 
            <h1 className="ui header">Editar Empresa</h1>
            <div className="ui segment">
               <CeoForm 
                  onSubmit={this.onSubmit} 
                  initialValues={initialValues} 
               />
            </div>  
         </div> 
      );
   }
};

export default CeoEdit;