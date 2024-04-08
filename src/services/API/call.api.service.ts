export const getMovies = async (language:string,api:string) => {
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

export const getMoviesSearch = async (url:string) => {
    // console.log("getMoviesSearch - url : ",url);
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

// export const getMovie = async (id: number) => {
//     try {
//         const response = await fetch('/api/movies/' + id);
//         const data = await response.json();
//         const m = data.data.movie;
//         return m;
//         console.error(error);
//     }
// }

export const getFullMovie = async (language:string,id: number) => {
    const append_to_response:string = 'credits%2Cimages%2Ckeywords%2Crecommendations%2Creviews%2Csimilar%2Cvideos';
    try {
        const response = await fetch('/api/movies/' + id+'?language='+language+'&append_to_response='+append_to_response);
        const data = await response.json();
        return data.data.movie;
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
