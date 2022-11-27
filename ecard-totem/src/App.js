
import Formulario from './components/Formulario';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (

<div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black shadow-lg ">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
  
                  <div className="text-center">
                    <img src="https://vcard-bestado.web.app/assets/icons/icon-152x152.png" alt="logo" className="logo" />
                    <h4 className="mt-1 mb-5 pb-1">Solicite su E-card</h4>
                  </div>
                  <Formulario/>
                  </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center gradient-custom-2">


                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  
                  <h4 className="mb-4">Instrucciones</h4>
                  <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                




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
