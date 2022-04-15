
import React , { useRef ,useState, useEffect } from 'react';

import { submitComment } from '../services';

const CommentsForm = ({slug}) => {


  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
    
  }, [])
  

  const handleCommentSubmission = () => {
        setError(false);

        const { value: comment} = commentEl.current;
        const { value: name} = nameEl.current;
        const { value: email} = emailEl.current;
        const { checked: storeData} = storeDataEl.current;

        if(!comment || !name || !email ){
          setError(true);
          return;
        }

        const commentObj = {name, email, comment, slug};

        if(storeData){
          window.localStorage.setItem('name', name);
          window.localStorage.setItem('email', email);
        } else {
          window.localStorage.removeItem('name', name);
          window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
          .then((res) => {
            setShowSuccessMessage(true);

            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
          })
  }

  return (
    <div className='bg-white shadow-lg rounded-md p-8 pb-12 mb-8'>
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          Escribe un comentario..
        </h3>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea ref={commentEl} className="p-4 outline-none w-full rounded-md focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 max-h-36 min-h-full"
          placeholder='Escribe aquí..'
          name="comment" 
          
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input 
            type="text" ref={nameEl}
            className="py-2 px-4 outline-none w-full rounded-md focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder='Nombre'
            name="name"
          />
           <input 
            type="text" ref={emailEl}
            className="py-2 px-4 outline-none w-full rounded-md focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
            placeholder='Email'
            name="email"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <input type="checkbox" ref={storeDataEl} id="storeData" name='storeData' value="true" />
              <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'> 📌 Guardar mis datos para comentarios futuros.</label>
            </div>
        </div>
          {error && <p className='text-xs text-red-500'> Por favor, complete todos los campos para dejar su comentario. 😬</p>}
          <div className="mt-8">
            <button 
              type="submit" 
              onClick={handleCommentSubmission}
              className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-md text-white px-8 py-3 cursor-pointer w-60 "
              >
                Enviar

            </button>
            {showSuccessMessage && <span className='text-xs float-right font-semibold mt-3 text-green-500'>Comentario enviado!, dejame revisarlo a ver si no tiene una groseria 😏  </span>}
          </div>        
        </div>
       
       
      
    </div>
  )
}

export default CommentsForm