export default function Form ({ handleFormSubmit, formData, setFormData, btnType, btnText }) {

    const handleInputChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.type);
        // console.log(e.target.value);
        console.log(formData);


        // formData[formData.indexOf(formData.find(field => field.name === e.target.name))].value = e.target.value;
        formData[e.target.name] = e.target.value;

        
        setFormData([
            ...formData
        ]);

    };










    return (
        <form className="row g-3" onSubmit={handleFormSubmit}>

            {/* {     
                formData.map((formField, index) => {
                    return (
                        <div key={index} className={`col-${formField.col_size ?? 6}`}>
                            
                            <label 
                                htmlFor={formField.name} 
                                className="form-label"
                            >
                                {formField.label} 
                            </label>

                            {
                                formField.type === "textarea" ?
                                    <FormTextAreaInput
                                        handleInputChange={handleInputChange}
                                        value={formField.value}
                                        name={formField.name}
                                        minLength={formField.minLength}
                                        maxLength={formField.maxLength}
                                        rows={formField.rows}
                                    />
                                :
                                    formField.type === "file" ?
                                        <FormFileInput
                                            handleInputChange={handleInputChange}
                                            name={formField.name}
                                            type={formField.type}
                                            required={formField.required}
                                        />
                                    :
                                        <FormNumberTextInput
                                            handleInputChange={handleInputChange}
                                            value={formField.value}
                                            name={formField.name}
                                            min={formField.min}
                                            max={formField.max}
                                            minLength={formField.minLength}
                                            maxLength={formField.maxLength}
                                            type={formField.type}
                                        />
                            }

                        </div> 
                    )
                })
            } */}



            <div className="col-12">
                <button
                    type="submit"
                    className={`btn btn-${btnType}`}
                >
                    {btnText}
                </button>
            </div>

        </form>
    );
};