const STORY_API_BASE_URL = "http://localhost:8080/story/";

class StoryService{
    getStoryById(id){
        console.log(id)
        return fetch(STORY_API_BASE_URL+id,{
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res=>res.json());
    }
}

export default new StoryService();