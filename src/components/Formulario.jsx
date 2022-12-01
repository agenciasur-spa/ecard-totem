import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { rutFormato, rutValidator } from "./validators";
import { QRCodeCanvas } from "qrcode.react";




const Formulario = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [counter, setCounter] = useState(120);
    const [response, setResponse] = useState({});
    const { register, formState: { errors }, handleSubmit, reset } = useForm();





    const [show, toggleShow] = useState(true);


    const onSubmit = (data) => {
        setSuccessMsg("Consulta correcta");
        toggleShow(!show)
        fetchUsers(data)
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
        setTimeout(() => {
            //alert('Periodo de inactividad');
            clearForm(interval)
        }, 120000);
        reset();
    };
    const fetchUsers = async rut => {
        try {
            const res = await axios.get(
                `https://bech.dev.ecard.cl/api/find`,
                {
                    headers: {
                        //'X-RapidAPI-Key': '4ee9424734msh8c05e0f6fde9c8cp1700f8jsn6b1ddc70a2d7',
                        //'X-RapidAPI-Host': 'andruxnet-random-famous-quotes.p.rapidapi.com'
                        'Content-Type': 'application/json'
                    },
                    params: {
                        nationalId: rut.rut
                    },
                }
            );

            if (!res.data || res.data.length == 0) {
                const emptyDataError = new Error('Invalid data');
                setResponse('NoUsuario');
                emptyDataError.statusCode = 500;
                throw emptyDataError;
                ;
            }
            setResponse(res.data);

        } catch (err) {


            if (err.response) {
                setResponse(err.response.status);

            }

            if (err.code === "ERR_NETWORK") {
                setResponse('NoUsuario');
            }
        }
    };
    const clearForm = (interval) => {

        setResponse({})
        setCounter(120)
        clearInterval(interval);
        setSuccessMsg("");
        toggleShow(show)
        reset();
    }
    const clearOnlyForm = (interval) => {
        setResponse({})
        clearInterval(interval);
        setCounter(120)
        setSuccessMsg("");
        toggleShow(!show)
        reset();
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>



            <DataUsuario response={response} successMsg={successMsg} counter={counter} />








            <h1 className="d-none">{show ? 'show' : 'hide'}</h1>

            {show && <div>
                <p className="h2 text-center">Ingresa tu RUN </p>
                <div className="form-outline mb-2">
                    <input className="form-control form-control-lg" type="text" name="rut"  {...register('rut', { required: true, validate: { rutFormato, rutValidator } })} />
                    <small id="emailHelp" className="form-text text-muted text-center h5">Sin puntos y con guión ejemplo: 9999999-9</small>
                    {errors.rut?.type === "required" && (<p className="text-center errorMsg text-danger">Ingreso de Run es requerido.</p>)}
                    {errors.rut?.type === "rutFormato" && (<p className="text-center errorMsg text-danger">El Formato ingresado no es válido.</p>)}
                    {errors.rut?.type === "rutValidator" && (<p className="text-center errorMsg text-danger">El Run ingresado no es válido.</p>)}
                </div>

                <div className="text-center pt-1 mt-5 mb-2 pb-1">
                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Enviar</button>
                </div>
            </div>}


            <div className="text-center"><button className="btn btn-outline-muted" type="button" onClick={() => clearOnlyForm()}>Limpiar formulario</button></div>


            {/*<button type="button" onClick={() => toggleShow(!show)}>
                      toggle: {show ? 'show' : 'hide'}
                  </button> */   }


        </form>
    )
}

const DataUsuario = (props) => {
    let component = null;

    //console.log(JSON.stringify(props.response))



    if (Object.keys(props.response).length === 0) {
        //console.log(props.response)
        component = ""

        if (props.response === 403) {
            component = <p className="text-danger text-center h3">No se ha encontrado el usuario</p>
        }

        if (props.response === 404) {
            component = <>
                <h3 className="text-center text-danger text-warning h3">E-card no disponible</h3>
                <p className="text-muted text-center">debe ser solicitada en Sistema de Requerimientos BancoEstado.</p>
            </>
        }
    }

    else if (props.response === "NoUsuario") {
        //console.log('sin con usuario')
        component = <p className="text-danger text-center h3">No se ha encontrado el usuario</p>
    }
    else {
        //console.log('con usuario')
        component = <>
            <p className="text-success text-center h3">{props.successMsg}</p>
            <p className="display-4 text-center">{props.response.name}</p>
            <div className="text-center">
                <QRCodeCanvas className="w-50 h-50" id="qrCode" value={`${props.response.qr}`} size={600} bgColor={"#FFFFFF"} level={"H"} />
                <h6 className="text-muted">Tiempo de inactividad: {props.counter}</h6>
            </div>
        </>
    }

    return <>
        {component}
    </>;
};




export default Formulario;
