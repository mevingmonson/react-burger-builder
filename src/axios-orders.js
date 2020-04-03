import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mevins-burger-builder.firebaseio.com/'
});

export default instance;