import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {filterPizzas} from "../actions/pizzasActions";

function Filter(props) {

    const dispatch = useDispatch();

    const [searchkey, setSearchkey] = useState('');
    const [category, setCategory] = useState('all');


    return (
        <div className='container'>
            <div className="row justify-content-center shadow-lg p-3 mb-2 bg-white rounded">
                <div className="col-md-2" >
                    <input type="text" className='form-control' style={{borderColor: "black"}} placeholder='search pizzas'
                          value={searchkey} onChange={(e) => setSearchkey(e.target.value)} />
                </div>

                <div className="col-md-1">
                    <select className='form-control' value={category} onChange={(e) => setCategory(e.target.value)} >
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                    </select>
                </div>

                <div className="col-md-1">
                    <button className='btn' onClick={()=>(dispatch(filterPizzas(searchkey, category)))}>FILTER</button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
