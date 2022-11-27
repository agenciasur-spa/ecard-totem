import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { rutFormato, rutValidator } from "./validators";
const Formulario  = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const {register, formState:{errors}, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        setSuccessMsg("User registration is successful.");
        reset();
    };

    return <>
        <h2>Formulario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
            <div>
                <label>Rut</label>
                <input type="text" name="rut" {...register('rut', {required: true,  validate: { rutFormato, rutValidator }})}/>
                {errors.rut?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
                {errors.rut?.type === "rutFormato" && (<p>formato</p>)}
                {errors.rut?.type === "rutValidator" && (<p>validador</p>)}
                
            </div>

            <div>
                <input type="submit" value="Enviar"/>
            </div>


        </form>
    </>
}
export default Formulario;