import React, { useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'

const AddListItem = ({ appendProductToList }) => {


    const [productName, setProductName] = useState('');
    const targetNameInput = (e) => {
        setProductName(e.target.value)
    };


    const [numbersOfProduct, setNumbersOfProduct] = useState();
    const targetNumberOfProduct = (e) => {
        setNumbersOfProduct(e.target.value)
    };


    const [productPrice, setProductPrice] = useState();
    const targetproductPrice = (e) => {
        setProductPrice(e.target.value)
    };


    const [complete, setComplete] = useState(true)


    const addProductToList = () => {

        const price = productPrice * numbersOfProduct

        const newProduct = {
            name: productName,
            quantity: numbersOfProduct,
            price: price.toFixed(2),
            status: complete
        };
        appendProductToList(newProduct);
        setProductName('');
        setNumbersOfProduct(``);
        setProductPrice(``);




        const postDataToActualList = () => {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify({
                "name": productName,
                "quantity": numbersOfProduct,
                "price": price.toFixed(2),
                "status": complete
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:3001/actualList", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        postDataToActualList()
    };







    return (
        <section>


            <button className='w-[85%] shadow-[6px_4px_8px_rgba(0,0,0,0.50)] gap-4 flex justify-center items-center font-extrabold mx-auto mt-[6rem] py-2 px-8 bg-white rounded-xl sm:max-w-[500px] md:min-w-[650px]   ' > WYBIERZ PRODUKTY Z PODANYCH < BiCaretDown size={25} className='' /> </button >


            <article className=' w-full  mt-[6rem] flex flex-col bg-[#32388F] bg-opacity-90 py-8 px-8 mx-auto md:max-w-[650px]  md:rounded-2xl   '>

                <main className='flex flex-col md:flex-row md:items-center md:justify-center md:mx-auto  md:gap-[8rem]'>

                    <div className='mx-auto grid '>
                        <p className='text-white font-bold mx-auto md:mx-0 '>WPISZ PRODUKT:</p>
                        <input className='py-4 px-4 max-w-[18rem] rounded-lg  mx-auto shadow-[6px_4px_8px_rgba(0,0,0,0.35)]  ' type="text" placeholder='mleko...' value={productName} onChange={targetNameInput} />
                    </div>

                    <div className='flex justify-center gap-[4rem] mt-[2rem] md:mt-0'>

                        <div >
                            <p className='text-white font-bold mx-auto'>ILOŚĆ:</p>
                            <input className='py-3 px-4 max-w-[4rem] text-center  rounded-lg  shadow-[6px_4px_8px_rgba(0,0,0,0.35)] md:mt-0  ' type="number" placeholder='2' value={numbersOfProduct} onChange={targetNumberOfProduct} />
                        </div>

                        <div  >
                            <p className='text-white font-bold mx-auto'>PODAJ CENĘ:</p>
                            <input className='py-3 px-4 max-w-[6.5rem] text-left rounded-lg    shadow-[6px_4px_8px_rgba(0,0,0,0.35)] md:mt-0  ' type="number" placeholder='3.59' value={productPrice} onChange={targetproductPrice} />
                        </div>

                    </div>

                </main>

                <button className=' mt-[2rem] max-w-[400px] mx-auto bg-white shadow-[6px_4px_8px_rgba(0,0,0,0.50)] font-extrabold py-2 px-8 rounded-xl md:mt-[4rem] hover:bg-black hover:text-white transition duration-500' onClick={addProductToList} >DODAJ PRODUKT DO LISTY</button>

            </article>


        </section>
    )
}

export default AddListItem