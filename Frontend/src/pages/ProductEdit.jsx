import React, { useState } from 'react'

import DefaultForm from '../components/formsUpdates/DefaultForm';
import ImageForm from '../components/formsUpdates/ImageForm';
import VariantsForm from '../components/formsUpdates/VariantsForm';

import { Toaster } from 'sonner'

import '../styles/pages/ProductEdit.css'


const ProductEdit = () => {

    const [section,setSection] = useState('product');

    const handleChange = (sectionForm) =>{
        setSection(sectionForm);
    }

    return (
        <main className="productEdit">

            <Toaster 
                theme='light'
                richColors
                closeButton
            />

            <div className="container">
                <h1 className='title'>Editar Producto</h1>
                <div className="header">
                    <ul className='section-list'>
                        {
                            ['product','image','variants'].map((sectionForm) => (
                                <React.Fragment key={sectionForm}>
                                    <li 
                                        onClick={()=> handleChange(sectionForm)}
                                        className={`${section === sectionForm ? 'active' : ''}`}
                                        >
                                        {sectionForm === "product" ? "Producto" : sectionForm === "image" ? "Imagenes" : "Variantes"}
                                    </li>
                                </React.Fragment>
                            ))
                        }
                    </ul>
                </div>
                <div className="body">
                    {
                        section === "product" ? 
                            <DefaultForm/>
                        :section === "image" ? 
                            <ImageForm/> 
                        : 
                            <VariantsForm/>
                    }
                    
                </div>  
            </div>
        </main>
    )
}

export default ProductEdit