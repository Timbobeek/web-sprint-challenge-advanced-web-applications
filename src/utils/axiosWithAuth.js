import axios from 'axios';

const axiosWithAuth = ()=> {
  const token = localStorage.getItem('token');
    return axios.create({
      headers:{
        authorization: token
      },
      baseURL: 'http://localhost:5000/api'
    })
}

export default axiosWithAuth;



//check if the way to get to the token is the same here!!!!!!!!!!!!!!!

//Task List:
//1. Complete axiosWithAuth