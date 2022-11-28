
import Formulario from './components/Formulario';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (

<div className="container-fluid py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-8">
          <div className="card rounded-3 text-black shadow-lg ">
            <div className="row g-0">
              <div className="col-xl-10 offset-lg-1">
                <div className="card-body p-md-5 mx-md-4">
  
                  <div className="text-center">
                    <img src="https://vcard-bestado.web.app/assets/icons/icon-152x152.png" alt="logo" className="logo" />
                    <h4 className="mt-3 mb-5 pb-1 display-1">Solicite su E-card</h4>
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
