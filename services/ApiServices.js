class ApiService {

    constructor(api){
        this.api = api
    }

    getTeachers = () => fetch(this.api + "/teachers").then(r => r.json())   
    
    
}