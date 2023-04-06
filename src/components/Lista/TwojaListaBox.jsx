import React from 'react'
import { BsTrash } from 'react-icons/bs'

import { BsCircle } from 'react-icons/bs'
import { AiOutlineCheckCircle } from 'react-icons/ai'

/*
1. drilowanie setFullList (ponieważ fullList jest stanem dwa komponenty wyżej, a w tym komponencie mamy dostęp do wartości za pośrednictwem props (product) product jest propsem który pochodzi ze stanu dwa komponenty wyżej)
2. dodaliśmy input i guziki edytuj i zapisz które są sterowane przez nową zmienną stanu editEnabled
3. setName jest funkcją odpalaną przy każdym klinięcu klawisza w inpucie -> tu się dzieje cała magia -> ponieważ mamy przekazany setFullList to możemy aktualizować stan fullList który znajduje się dwa komponenty wyżej
*/
const TwojaListaBox = ({ product, index, handleDelete, toggleComplete, setFullList }) => {


    const [editEnabled, setEditEnabled] = React.useState(false)


    function editName(event) {
        console.log(event)
        setEditEnabled(true)
    }
    function saveName(event) {
        console.log()
        setEditEnabled(false)
    }


    function setName(event) {
        console.log(event)
        const newName = event.target.value
        setFullList(previousList => {
            let newList = Array.from(previousList) // możesz spróbować znaleźć odpowiedź dlaczego
            console.log(newList)
            newList[index].nazwa = newName
            console.log(newList)
            return newList
        })
    }


    return (

        <section key={index} className='flex items-center justify-center gap-2 mt-[2rem] md:gap-8'>

            <BsTrash size={25} onClick={() => handleDelete(index)} />

            <div className='flex flex-col justify-between items-center w-[90%] bg-[#B7C6FF] py-3 px-4 rounded-xl shadow-[0px_5px_4px_rgba(0,0,0,0.35)] sm:flex-row md:px-8'>
                {editEnabled || <p className='font-bold'>{product.nazwa}</p>}
                {editEnabled && <input value={product.nazwa} onChange={setName}></input>}
                {editEnabled || <button onClick={editName}> edit</button>}
                {editEnabled && <button onClick={saveName}>save</button>}

                <div className='flex gap-4 items-center py-2 sm:py-0 md:gap-16 '>
                    <p className='font-bold'>{product.ilosc}</p>
                    <p className='font-bold'>{product.cena}</p>

                    <div className='max-w-[1rem] ' onClick={() => toggleComplete(index)} >
                        {product.status ? <BsCircle size={25} /> : <AiOutlineCheckCircle size={25} />}

                    </div>
                </div>
            </div>
        </section>

    )
}

export default TwojaListaBox