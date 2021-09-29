import axios from 'axios';

const fetchClient = () => {
    const defaultOptions = {
        baseURL: "http://localhost:8080/",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    }

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('jwtToken');
        config.headers.Authorization =  token ? token : '';
        return config;
    })

    return instance;
}

export default fetchClient();
