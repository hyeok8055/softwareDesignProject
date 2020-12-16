import axios from 'axios';
import {MART, PRODUCT, PRICE} from './types';

export function registerMart(dataToSubmit) {

    const request = axios.post('/api/mart',dataToSubmit)
        .then(response => response.data)
    
    return {
        type: MART,
        payload: request
    }
}

export function registerProduct(dataToSubmit) {

    const request = axios.post('/api/product',dataToSubmit)
        .then(response => response.data)
    
    return {
        type: PRODUCT,
        payload: request
    }
}

export function setPriceData(dataToSubmit) {

    const request = axios.post('/api/price',dataToSubmit)
        .then(response => response.data)
    
    return {
        type: PRICE,
        payload: request
    }
}