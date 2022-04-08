const PROFILE_API_BASE_URL = "http://localhost:8080/profile/";

class ProfileService{
    getProfileById(id){
        console.log("Viewing ID...",id)
        return fetch(PROFILE_API_BASE_URL+id,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res=>res.json());
    }
}

export default new ProfileService();
