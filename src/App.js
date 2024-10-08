import React from 'react';
import Rotas from './main/routes';
import NavBar from './components/navbar';
import ProvedorAutenticacao from './main/provedorAutenticacao';

import 'toastr/build/toastr.min.js'
import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'

import 'toastr/build/toastr.css'


//import { PrimeReactProvider} from 'primereact/api';

//import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primeicons/primeicons.css'

class App extends React.Component {
  
    render() {
      return(
        <ProvedorAutenticacao>
        <NavBar/>

        <div className="container">

          <Rotas/>

      </div>
      </ProvedorAutenticacao>
      )
    }
}

export default App;
