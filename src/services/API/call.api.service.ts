export const getMedias = async (language:string,api:string) => {
    try {
        api = api + '?language=' + language;
        const response = await fetch(api);
        const data = await response.json();
        if(api.includes("recommanded")){
            return data.data;
        }
        return data.data.results;
    } catch (error) {
        console.error(error);
    }
}
export const getMediaSearch = async (url:string) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}
export const getFullMedia = async (language:string,id: number, type:string) => {
    let append_to_response:string;
    let fetchURL:string;
    switch(type){
        //TODO mettre ça dans un fichier de conf !!
        case "movie":
            append_to_response = 'credits%2Cimages%2Ckeywords%2Crecommendations%2Creviews%2Csimilar%2Cvideos';
            fetchURL = '/api/movies/' + id+'?language='+language+'&append_to_response='+append_to_response;
            break;
        case "serie":
            append_to_response = 'credits%2Cimages%2Crecommendations%2Creviews%2Csimilar%2Cvideos%2Cwatch%2Fproviders';
            fetchURL = "/api/series/"+id+"?language="+language+"&append_to_response="+append_to_response;
            break;
    }
    try {
        const response = await fetch(fetchURL!);
        const data = await response.json();
        switch(type){
            case "movie": return data.data.movie;
            case"serie": return data.data.serie;
        }
    } catch (error) {
        console.error(error);
    }
}
export const getMovieLike = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/likes');
        const data = await response.json();
        if(data.liked){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}
export const getMoviesLiked = async (language:string,idUser: string) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/likes?language='+language);
        const data = await response.json();
        console.log("API getMoviesLiked - data : ",data.data.movies);
        return data.data.movies;
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}
export const updateMovieLike = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/likes', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateMovieLike - data : ",data);
        return data.data.liked;
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}

export const getSerieLike = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/likes');
        const data = await response.json();
        if(data.liked){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}
export const updateSerieLike = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/likes', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateSerieLike - data : ",data);
        return data.data.liked;
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}


export const getMoviesSeen = async (language:string,idUser: string) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/seen?language='+language);
        const data = await response.json();
        console.log("API getMoviesSeen - data : ",data.data.movies);
        return data.data.movies;
    }catch (error) {
        console.error("Erreur lors de la récupération des seen : ",error);
    }
}
export const getMovieSeen = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/seen');
        const data = await response.json();
        console.log("call api getMovieSeen - data : ",data)
        if(data.seen){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du seen : ",error);
    }
}
export const updateMovieSeen = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/seen', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateMovieSeen - data : ",data);
        return data.data.seen;
    }catch (error) {
        console.error("Erreur lors de la récupération du seen : ",error);
    }
}

export const getSerieSeen = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/seen');
        const data = await response.json();
        if(data.seen){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du seen : ",error);
    }
}
export const updateSerieSeen = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/seen', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateSerieSeen - data : ",data);
        return data.data.seen;
    }catch (error) {
        console.error("Erreur lors de la récupération du like : ",error);
    }
}


export const getMovieToWatch = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/towatch');
        const data = await response.json();
        if(data.toWatch){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du toWatch : ",error);
    }
}
export const updateMovieToWatch = async (idUser: string, idMovie:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/movies/'+idMovie+'/towatch', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateMovieToWatch - data : ",data);
        return data.data.toWatch;
    }catch (error) {
        console.error("Erreur lors de la récupération du toWatch : ",error);
    }
}

export const getSerieToWatch = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/towatch');
        const data = await response.json();
        if(data.toWatch){
            return true;
        }else{
            return false;
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du toWatch : ",error);
    }
}
export const updateSerieToWatch = async (idUser: string, id:number) => {
    try{
        const response = await fetch('/api/users/' + idUser+'/series/'+id+'/towatch', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("call api updateSerieToWatch - data : ",data);
        return data.data.toWatch;
    }catch (error) {
        console.error("Erreur lors de la récupération du toWatch : ",error);
    }
}

export const getFullActor = async (language:string,id: number) => {
    let append_to_response = 'combined_credits%2Cimages';
    let fetchURL = '/api/people/' + id+'?language='+language+'&append_to_response='+append_to_response;
    try {
        const response = await fetch(fetchURL);
        const data = await response.json();
       return data.data.people;
    } catch (error) {
        console.error(error);
    }
}
