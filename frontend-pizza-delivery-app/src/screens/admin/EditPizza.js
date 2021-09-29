import React, {useEffect, useState} from 'react';
import {editPizza, getPizzaById} from "../../actions/pizzasActions";
import {useDispatch, useSelector} from "react-redux";
import Load from "../../components/util/Load";
import Error from "../../components/util/Error";
import Success from "../../components/util/Success";

function EditPizza({match}) {

    const dispatch = useDispatch();
    const {pizza, loading, error} = useSelector((state) => state.getPizzaByIdReducer)
    const {editLoading, editSuccess, editError} = useSelector((state) => state.editPizzaReducer)
    const [name, setName] = useState('');
    const [smallPrice, setSmallPrice] = useState('');
    const [mediumPrice, setMediumPrice] = useState('');
    const [largePrice, setLargePrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(
        () => {

            if (pizza) {
                if (pizza.id === match.params.pizzaid) {
                    setName(pizza.name)
                    setImage(pizza.image)
                    setDescription(pizza.description)
                    setCategory(pizza.category)
                    setSmallPrice(pizza.prices[0]['small'])
                    setMediumPrice(pizza.prices[0]['medium'])
                    setLargePrice(pizza.prices[0]['large'])
                } else {
                    dispatch(getPizzaById(match.params.pizzaid))
                }
            } else {
                dispatch(getPizzaById(match.params.pizzaid))
            }
        }, [pizza, dispatch]
    )

    const handleSubmit = (e) => {
        e.preventDefault();

        const pizza = {
            name,
            category,
            image,
            description,
            prices: [{
                small: smallPrice,
                medium: mediumPrice,
                large: largePrice
            }]
        }

        dispatch(editPizza(match.params.pizzaid, pizza))
    };

    return (
        <div className='text-sm-start'>
            <h2 className='text-sm-center mt-2'>Edit Pizza</h2>
            <h5 className='text-sm-center mt-2'>Pizza Id: {pizza.id}</h5>
            {loading && (<Load />)}
            {error && (<Error error={'Load Pizza Details went wrong'}/>)}
            {editSuccess && (<Success success={'Pizza Updated Successfully'}/>)}
            {editLoading && (<Load />)}
            {editError && (<Error error={'Edit went wrong'}/>)}

            <form onSubmit={handleSubmit}>
                <label className="form-label">Pizza Name:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" value={name}
                       onChange={(e) => (setName(e.target.value))}/>

                <label className="form-label">Small varient price:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="small varient price" value={smallPrice}
                       onChange={(e) => (setSmallPrice(e.target.value))}/>

                <label className="form-label">Medium varient price:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="medium varient price" value={mediumPrice}
                       onChange={(e) => (setMediumPrice(e.target.value))}/>

                <label className="form-label">Large varient price:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="large varient price" value={largePrice}
                       onChange={(e) => (setLargePrice(e.target.value))}/>

                <label className="form-label">Image Url:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="image url" value={image}
                       onChange={(e) => (setImage(e.target.value))}/>

                <label className="form-label">Description:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="description" value={description}
                       onChange={(e) => (setDescription(e.target.value))}/>

                <label className="form-label">Category:</label>
                <select id='editPizzaCat' className="form-select mb-2" style={{width: "200px"}}
                        value={category}
                        onChange={(e) => (setCategory(e.target.value))}>
                    <option value="all">All</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                </select>

                <button disabled={!name || !smallPrice || !mediumPrice || !largePrice || !image || !description  || !category} className='btn mt-3' type='submit'>Edit Pizza</button>
            </form>
        </div>
    );
}

export default EditPizza
