//import axios from "axios";

const ACTIVITY_API_BASE_URL = "http://localhost:8080/activity/";

class ActivityService{
    getActivityById(id){
        console.log("hello")
        console.log(id)
        return fetch(ACTIVITY_API_BASE_URL+id,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res=>res.json());
    }
    //getActivityById(id){
    //    return axios.get(ACTIVITY_API_BASE_URL + '/' + id);
    //}
}

export default new ActivityService();