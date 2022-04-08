const ACTIVITY_API_BASE_URL = "http://localhost:8080/activity/";

class ActivityService{
    getActivityById(id){
        console.log("Viewing ID...",id)
        return fetch(ACTIVITY_API_BASE_URL+id,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res=>res.json());
    }
}

export default new ActivityService();