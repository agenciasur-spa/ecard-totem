
import Formulario from './components/Formulario';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (

<div className="container-fluid py-3 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-6">
          <div className="card rounded-3 text-black shadow-lg ">
            <div className="row p-0">
              <div className="col-xl-12">
                <div className="card-body">
  
                  <div className="text-center">
                    <img src="https://vcard-bestado.web.app/assets/icons/icon-152x152.png" alt="logo" className="logo" />
                    <h3 className="mt-3 mb-5 pb-1 font-weight-300">Solicite su E-card</h3>
                  </div>
                  <Formulario/>
                  </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>




 
  );
}

export default App;
