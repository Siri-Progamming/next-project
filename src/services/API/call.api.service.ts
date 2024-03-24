export const getMovies = async (api:string) => {
    try {
        const response = await fetch(api);
        const data = await response.json();
        return data.data.results;
    } catch (error) {
        console.error(error);
    }
}

export const getMoviesSearch = async (url:string) => {
    try {
        console.log("getMoviesSearch - URL : ", url)
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const getMovie = async (id: number) => {
    try {
        const response = await fetch('/api/movies/' + id);
        const data = await response.json();
        const m = data.data.movie;
        return m;
    } catch (error) {
        console.error(error);
    }
}

export const getFullMovie = async (id: number) => {
    const append_to_response:string = 'credits%2Cimages%2Ckeywords%2Crecommendations%2Creviews%2Csimilar%2Cvideos';
    try {
        const response = await fetch('/api/movies/' + id+'?language=fr-FR'+'&append_to_response='+append_to_response);
        // const response = await fetch('/api/movies/' + id+'?append_to_response='+append_to_response);
        const data = await response.json();
        const m = data.data.movie;
        console.log("Full movie : ", m);
        return m;
    } catch (error) {
        console.error(error);
    }
}
