import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addPizza} from "../../actions/pizzasActions";
import Success from "../../components/util/Success";
import Error from "../../components/util/Error";

function AddPizza(props) {

    const dispatch = useDispatch()

    const [name, setName] = useState('');
    const [smallPrice, setSmallPrice] = useState('');
    const [mediumPrice, setMediumPrice] = useState('');
    const [largePrice, setLargePrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const {loading,success,error } = useSelector((state) => state.addPizzaReducer)

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
        console.log(pizza)
        dispatch(addPizza(pizza));
    };

    return (
        <div className='text-sm-start'>
            <h2 className='text-sm-center mt-2'>Add Pizza</h2>
            {success && (<Success success={'Pizza Added Successfully'}/>)}
            {error && (<Error error={'Something went wrong'}/>)}

            <form onSubmit={handleSubmit}>
                <label className="form-label">Pizza Name:</label>
                <input className='form-control mb-3' style={{width: "700px"}} type="text" placeholder="name" value={name}
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
                <select id='addPizzaCat' className="form-select mb-2" style={{width: "200px"}}
                        value={category}
                        onChange={(e) => (setCategory(e.target.value))}>
                    <option value="all">All</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                </select>

                 <button disabled={!name || !smallPrice || !mediumPrice || !largePrice || !image || !description  || !category} className='btn mt-3' type='submit'>Add Pizza</button>
            </form>
        </div>
    );
}

export default AddPizza
