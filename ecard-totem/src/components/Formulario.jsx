import React, { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { rutFormato, rutValidator } from "./validators";

const Formulario  = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [response, setResponse] = useState("response");
    const {register, formState:{errors}, handleSubmit, reset } = useForm();
    
    const onSubmit = (data) => {
        // https://my-json-server.typicode.com/maur-ojeda/Mockend/users
        // https://github.com/maur-ojeda/Mockend/blob/main/db.json

        setSuccessMsg("Consulta correcta");
        fetchUsers(data)
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

    return <>
        <h2>Formulario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        
        {successMsg && <p className="success-msg">{successMsg}</p>}
    
        {response && <span>{response[0].name}</span> }
        {response && <span>{response[0].token}</span> }

    
        
       


            <div>
                <label>Rut</label>
                <input type="text" name="rut" {...register('rut', {required: true,  validate: { rutFormato, rutValidator }})}/>
                {errors.rut?.type === "required" && (
            <p className="errorMsg">Rut es requerido.</p>
          )}
                {errors.rut?.type === "rutFormato" && (<p>Formato no válido.</p>)}
                {errors.rut?.type === "rutValidator" && (<p>Rut no válido.</p>)}
                
            </div>  

            <div>
                <input type="submit" value="Enviar"/>
            </div>


        </form>

       
    </>
}
export default Formulario;