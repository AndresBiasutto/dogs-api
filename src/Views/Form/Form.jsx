import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { useState } from "react";
import { getTemperaments } from "../../redux/actions";
import { validateForm } from "./FormValidator";
import style from "./Form.module.css"



const Form = () => {
    const temperaments = useSelector(state => state.temperaments)
    const dispatch = useDispatch()
    const [ setSelectedTemperamentId] = useState(0);
    const [form, setForm] = useState({
        name: "",
        image: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLife_span: "",
        maxLife_span: "",
        temperament: 0
    })
    const [errors, setErrors] = useState({
        name: "",
        image: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLife_span: "",
        maxLife_span: "",
        temperament: ""
    })
    const formatDog = (form) => {
        return {
            name: form.name,
            image: form.image,
            weight: `${form.minWeight} - ${form.maxWeight}`,
            height: `${form.minHeight} - ${form.maxHeight}`,
            life_span: `${form.minLife_span} - ${form.maxLife_span} years`,
            temperament: form.temperament
        }

    }

    const changeHandler = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value })
        validateForm({ ...form, [property]: value }, setErrors)
        console.log(errors)
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(`https://back-end-dogs-ok.onrender.com/dogs`, formatDog(form)).then(res => alert("perro creado con exito"))
    }

    return (
        <div className={style.container}>
            <form onSubmit={submitHandler} className={style.form}>

                <div className={style.inputForm}>
                    <input type="text" value={form.name} onChange={changeHandler} name="name" placeholder="Dog name" className={`${style.input} ${errors.name? style.crash:style.success}`} />
                    <div className={style.errors}>
                        {errors.name && <span className={style.span}>{errors.name}</span>}

                        <span className={style.icon}></span>
                    </div>

                </div>

                <div className={style.inputForm}>
                    <input type="url" value={form.image} onChange={changeHandler} name="image" placeholder="Image url" className={`${style.input} ${errors.image? style.crash:style.success}`} />
                    <div className={style.errors}>
                        {errors.image && <span className={style.span}>{errors.image} </span>}
                        <span className={style.icon}></span>
                    </div>
                </div>

                <div className={style.formGrup}>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.minWeight} onChange={changeHandler} name="minWeight" placeholder="min Weight Kg" className={`${style.input} ${style.num} ${errors.minWeight? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.minWeight && <span className={style.span}>{errors.minWeight} </span>}
                            <span className={style.icon}></span>
                        </div>
                    </div>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.maxWeight} onChange={changeHandler} name="maxWeight" placeholder="max Weight Kg" className={`${style.input} ${style.num} ${errors.maxWeight? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.maxWeight && <span className={style.span}>{errors.maxWeight} </span>}
                            <span className={style.icon}></span>
                        </div>
                    </div>
                </div>

                <div className={style.formGrup}>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.minHeight} onChange={changeHandler} name="minHeight" placeholder="min Height Cm" className={`${style.input} ${style.num} ${errors.minHeight? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.minHeight && <span className={style.span}>{errors.minHeight} </span>}
                            <span className={style.icon}></span>
                        </div>
                    </div>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.maxHeight} onChange={changeHandler} name="maxHeight" placeholder="max Height Cm" className={`${style.input} ${style.num} ${errors.maxHeight? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.maxHeight && <span className={style.span}>{errors.maxHeight} </span>}
                            <span className={style.icon}></span>
                        </div>

                    </div>
                </div>

                <div className={style.formGrup}>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.minLife_span} onChange={changeHandler} name="minLife_span" placeholder="min Life span" className={`${style.input} ${style.num} ${errors.maxLife_span? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.minLife_span && <span className={style.span}>{errors.minLife_span} </span>}
                            <span className={style.icon}></span>
                        </div>
                    </div>
                    <div className={style.inputForm}>
                        <div className={style.inputDetail}>
                            <input type="number" value={form.maxLife_span} onChange={changeHandler} name="maxLife_span" placeholder="max Life span" className={`${style.input} ${style.num} ${errors.maxLife_span? style.crash:style.success}`} />
                        </div>
                        <div className={style.errors}>
                            {errors.maxLife_span && <span className={style.span}>{errors.maxLife_span} </span>}
                            <span className={style.icon}></span>
                        </div>
                    </div>
                </div>

                <div className={style.inputForm}>
                    <select
                        value={form.temperament}
                        onChange={(e) => {
                            changeHandler(e);
                            setSelectedTemperamentId(Number(e.target.value)); // Convertir a número
                        }}
                        name="temperament"
                        className={style.input}
                    >
                        <option value="">-- Select a temperament --</option>
                        {temperaments.map((temperament) => (
                            <option key={temperament.id} value={temperament.id}> {/* Usar el id como valor */}
                                {temperament.name}
                            </option>
                        ))}
                    </select>
                    {errors.temperament && <span className={style.span}>{errors.temperament} </span>}
                </div>
                 <button type="submit" className={`${style.boton} ${errors.name || errors.image || errors.minWeight || errors.maxWeight || errors.minHeight || errors.maxHeight || errors.minLife_span || errors.maxLife_span ? style.disabled: style.button}`}>SEND</button>
            </form>
        </div>
    )
}
export default Form;