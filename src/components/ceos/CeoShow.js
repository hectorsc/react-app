import React from 'react';
import { Link } from 'react-router-dom';
import { fetchCeo } from '../../api/apiActions';

class CeoShow extends React.Component {

   state = { ceo: [] };

   async componentDidMount() {
      const response = await fetchCeo(this.props.match.params.id);
      this.setState({ ceo : response.ceo });
   }

   render() {
      const { ceo }  = this.state;
      return (
         <div className="ui card" style={{ width: '100%' }}>
            <div className="content">
               <div className="header">{ceo.company_name}</div>
            </div>
            <div className="content">
               <h4 className="ui sub header">Actividad</h4>
               <div className="ui small feed">
                  <div className="event">
                     <div className="content">
                        <div className="summary">
                           <p>CEO: {ceo.name}</p> 
                        </div>
                     </div>
                  </div>
                  <div className="event">
                     <div className="content">
                        <div className="summary">
                           <p>Año de creación: {ceo.year}</p>
                        </div>
                     </div>
                  </div>
                  <div className="event">
                     <div className="content">
                        <div className="summary">
                           <p>Sede: {ceo.company_headquarters}</p>
                        </div>
                     </div>
                  </div>
                  <div className="event">
                     <div className="content">
                        <div className="summary">
                           <p>¿A qué se dedica la empresa?:</p>
                           <p>{ceo.what_company_does}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="extra content">
               <Link to={'/'} className="ui labeled icon button primary">
                  <i className="left arrow icon"></i>
                  Volver
               </Link>
            </div>
         </div>
      );
   }
};

export default CeoShow;