import React from 'react';
import { fetchCeos, deleteCeo } from '../../api/apiActions';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

class CeoList extends React.Component {

   state = { ceos: [], results: '', deleted: false }

   getCeos = async () => {
      const response = await fetchCeos();
      let results = '';
      if (typeof response === 'object') {
         results = response.ceos.length > 0 ? 'true' : 'false';
         this.setState({ ceos: response.ceos, results });
      } else this.setState({ ceos: response, results });
   }

   async componentDidMount () {
      await this.getCeos();
   }

   async componentDidUpdate() {
      if (this.state.deleted) { 
         this.setState({deleted: false});
         await this.getCeos();
      }
   }

   // NO ESTOY SEGURO SI PARA ALGUN CASO CONCRETO DEBO USARLO
   componentWillUnmount() {
      this.setState({deleted: false});
   }

   async alert(id, company) {
      const willDelete = await swal({
         title: `¿Estás seguro que quieres eliminar la empresa ${company}?`,
         text: 'Una vez eliminada, ¡no podrá recuperar esta empresa!',
         icon: "warning",
         buttons: true,
         dangerMode: true
      });
      if (willDelete) {
         await deleteCeo(id);
         this.setState({deleted: true});
      } 
   }

   renderList() {
      return this.state.ceos.map(ceo => {
         return(
            <div className="item" key={ceo.id}>
               <div className="right floated content">
                  <Link to={`/ceos/${ceo.id}`} className="ui icon button teal">
                     <i className="info icon"></i>
                  </Link>
                  <Link to={`/ceos/edit/${ceo.id}`} className="ui icon button primary">
                     <i className="edit icon"></i>
                  </Link>
                  <button 
                     className="ui icon button negative"
                     onClick={() => this.alert(ceo.id, ceo.company_name)}
                  >
                     <i className="trash alternate icon"></i>
                  </button>
               </div>
               <div className="content" style={{ paddingTop: '10px' }}>{ceo.company_name}</div>
            </div>
         );
      })
   }

   render() {
      let results = this.state.results === 'false' ? 'No se han encontrado resultados...': '';
      return (
         <div>
            <h1 className="ui header">
               Listado de empresas 
               <Link to={'/ceos/new'} className="ui button right floated positive">Crear Empresa</Link>
            </h1>
            <div className="my-list-divided ui list divided segment" style={{ marginTop: '25px'}} >
               {this.renderList()}
               {results}
            </div>
         </div>
      );
   }
};

export default CeoList;