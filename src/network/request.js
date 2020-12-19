import Axios from 'axios';

export function request(config){
  const instance = Axios.create({
    baseURL : 'http://152.136.185.210:7878/api/m5/',
    timeout : 5000
  });

  return instance(config);
}