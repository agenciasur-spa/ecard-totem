import React, {useState, useEffect} from "react";
import axios from 'axios';
import {useForm} from "react-hook-form";
import {rutFormato, rutValidator} from "./validators";
import {QRCodeCanvas} from "qrcode.react";


const Formulario = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [counter, setCounter] = useState(0);
    //const [response, setResponse] = useState(false);
    const [response, setResponse] = useState([]);
    const {register, formState: {errors}, handleSubmit, reset} = useForm();
    const [show, toggleShow] = useState(true);

    const onSubmit = (data) => {

        setSuccessMsg("Consulta correcta");

        toggleShow(!show)

        //const userData = fetchUsers(data);
        obtUserData(data);

        fetchUsers(data)
//        setSuccessMsg("Consulta correcta");


        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        setTimeout(() => {
            alert('Periodo de inactividad');
            clearForm(interval)

        }, 30000);


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


            if (!res.data || res.data.length == 0) {
                const emptyDataError = new Error('Invalid data');
                //setResponse('');
                emptyDataError.statusCode = 500;
                throw emptyDataError;
                ;
            }


            //setResponse(res.data);

        } catch (err) {
            console.log(err);
        }
    };


    const clearForm = (interval) => {
        setResponse(null)
        setCounter(0)
        clearInterval(interval);
        setSuccessMsg("");
        toggleShow(show)
        reset();
    }

    const clearOnlyForm = () => {
        setResponse(null)
        setCounter(0)
        setSuccessMsg("");
        toggleShow(!show)
        reset();
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>


            {response ? successMsg && <p className="text-success text-center display-4">{successMsg}</p> : ''}
            {response ? <p className="display-4 text-center">{response[0].name}</p> : ''}
            {response ? <div className="text-center">
                <QRCodeCanvas id="qrCode"
                              value={`https://stackoverflow.com/questions/39523040/concatenating-variables-and-strings-in-react/pepe=${response[0].token}`}
                              size={600} bgColor={"#FFFFFF"} level={"H"}/>
                <h6 className="text-muted display-4 ">Tiempo de inactividad: {counter}</h6>
            </div> : ''}


            <h1 className="d-none">{show ? 'show' : 'hide'}</h1>

            {show && <div>
                <p className="display-3 text-center">Ingrese su RUN </p>
                <div className="form-outline mb-4 display-4">
                    <input className="form-control form-control-lg" type="text"
                           name="rut" {...register('rut', {required: true, validate: {rutFormato, rutValidator}})}/>
                    <small id="emailHelp" className="form-text text-muted">Sin puntos y con guión ejemplo:
                        9999999-9</small>
                    {errors.rut?.type === "required" && (
                        <p className="errorMsg text-danger">Ingreso de Run es requerido.</p>)}
                    {errors.rut?.type === "rutFormato" && (
                        <p className="errorMsg text-danger">El Formato ingresado no es válido.</p>)}
                    {errors.rut?.type === "rutValidator" && (<p>El Run ingresado no es válido.</p>)}
                </div>


                <div className="text-center pt-1 mt-5 mb-2 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Enviar
                    </button>
                </div>
            </div>}


            <div className="text-center">
                <button className="btn btn-outline-muted" type="button" onClick={() => clearOnlyForm()}>Limpiar
                    formulario
                </button>
            </div>


            <div className="d-flex align-items-center justify-content-center pb-4">

                <h2>Si tiene problemas Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h2>
            </div>


            {/*<button type="button" onClick={() => toggleShow(!show)}>
                      toggle: {show ? 'show' : 'hide'}
                  </button> */}


        </form>
    )
}
export default Formulario;