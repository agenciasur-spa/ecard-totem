import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { rutFormato, rutValidator } from "./validators";
import { QRCodeCanvas } from "qrcode.react";




const Formulario  = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [counter, setCounter] = useState(0);
    const [response, setResponse] = useState(false);
    const {register, formState:{errors}, handleSubmit, reset } = useForm();
    
    const onSubmit = (data) => {
        // https://my-json-server.typicode.com/maur-ojeda/Mockend/users
        // https://github.com/maur-ojeda/Mockend/blob/main/db.json

        setSuccessMsg("Consulta correcta");
        fetchUsers(data)


    const interval =   setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
          }, 1000);
      


        setTimeout(() => {
            alert('periodo de inactividad despues de 2 segundos');    
            setResponse(null)
            setCounter(0)
            clearInterval(interval);
            setSuccessMsg("");
            reset();    
          }, 5000);


        reset();
    };


    

    const fetchUsers = async rut => {
		try {
			const res = await axios.get(
                `https://my-json-server.typicode.com/maur-ojeda/Mockend/users`,
                {
                    headers: {
                        //'X-RapidAPI-Key': '4ee9424734msh8c05e0f6fde9c8cp1700f8jsn6b1ddc70a2d7',
                        //'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
                    },
                    params: {
                        nationalId: rut.rut
                    },
                }

                );
			setResponse(res.data);
		} catch (err) {
			console.log(err);
		}
	};

    return(

        <form className="form-inline-" onSubmit={handleSubmit(onSubmit)}>
        
        {successMsg && <p className="success-msg">{successMsg}</p>}
    
        {response && <span>{response[0].name}</span> }
        {response ? <QRCodeCanvas id="qrCode" value={`https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react/pepe=${ response[0].token }`} size={300} bgColor={"#FFFFFF"} level={"H"}/> : ''}


   
        <p>Ingrese su RUN </p>

        <h6 className="text-muted">Tiempo de inactividad: {counter}</h6>

        <div className="form-outline mb-4">
                
                <input className="form-control form-control-lg"  type="text" name="rut" {...register('rut', {required: true,  validate: { rutFormato, rutValidator }})}/>
                <small id="emailHelp" className="form-text text-muted">Sin puntos y con guión ejemplo: 9999999-9</small>

                {errors.rut?.type === "required" && (<p className="errorMsg text-danger">Ingreso de Run es requerido.</p>)}
                {errors.rut?.type === "rutFormato" && (<p className="errorMsg text-danger">El Formato ingresado no es válido.</p>)}
                {errors.rut?.type === "rutValidator" && (<p>El Run ingresado no es válido.</p>)}
                
        </div>  

        
    
                   
  
                    <div className="text-center pt-1 mb-5 pb-1">
                      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Enviar</button>
                    
                        <button  className="btn btn-outline-muted" type="button" onClick={() => setResponse(null)}>Limpiar formulario</button>

                    </div>
  

                    <div className="d-flex align-items-center justify-content-center pb-4">
                      
                      <small>Si tiene problemas Lorem ipsum dolor, sit amet consectetur adipisicing elit. </small>
                    </div>

        
        </form>
)
}
export default Formulario;