import axios from "axios";

const httpCliente = axios.create({
    baseURL: 'http://localhost:8080'
})

class ApiService{
    
    constructor(apiURL){
        this.apiURL = apiURL;
    }

    post(url, objeto){
        const requestUrl = `${this.apiURL}${url}`
        return httpCliente.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiURL}${url}`
        return httpCliente.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiURL}${url}`
        return httpCliente.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiURL}${url}`
        return httpCliente.get(requestUrl);
    }
}

export default ApiService