import React, {useEffect, useState} from "react";
import {useAuth} from "../../../../src/contexts/AuthContext";
import {useRouter} from 'next/router';
import {MediaCardProps, MediaSearchState} from "../../../../src/interfaces/UI";
import {getMoviesLiked} from "../../../../src/services/API/call.api.service";
import {createMediaCardPropsFromMovie} from "../../../../src/services/API/object.creator.service";
import {useConstantes} from "../../../../src/contexts/ConstantesContext";
import VerticalItemsShowcase from "../../../../src/components/Showcase/VerticalItemsShowcase";
import Loader from "../../../../src/components/utils/Loader";

interface likesProps {
}
const Likes: React.FC<likesProps> = () => {
    const {user, isTokenVerified} = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {DISPLAY_LANGUAGE} = useConstantes();
    const [mediaCards, setMediaCards] = useState<Array<MediaCardProps>>([])
    const [mediaSearchState, setMediaSearchState] = useState<MediaSearchState>({isSearchEmpty: false, isLoading: true, nbPages: 1, nbResults: 0});
    const [starterLoader, setStarterLoader] = useState<boolean>(true);

    const initFavoriteMovies = async () => {
        setMediaSearchState({...mediaSearchState, isSearchEmpty: false, isLoading:true, nbResults: 0});
        // console.log("calling getMoviesLiked with user id : ",user?.id!);
        const results = await getMoviesLiked(DISPLAY_LANGUAGE,user?.id!);
        // console.log("initFavoriteMovies - results : ",results);
        if(results && results.length > 0){
            setMediaSearchState({...mediaSearchState,nbResults: results.length});
            let tempMovies: Array<MediaCardProps> = [];
            for(const result of results) {
                tempMovies.push(createMediaCardPropsFromMovie(result))
            }
            setMediaCards(tempMovies);
        }else{
            setMediaSearchState({...mediaSearchState, isSearchEmpty: true, isLoading:false, nbResults:0});
        }
    }

    const handlePageChange = async (e: React.ChangeEvent<unknown>, pageNumber: number) => {
        console.log("Changing page in movies likes - Not already implemented...");
    }

    useEffect(() => {
        if(!isTokenVerified){
            setIsLoading(true);
            return;
        }else{
            if(!user){
                router.push('/ui/login').then();
            }else{
                setIsLoading(false);
                initFavoriteMovies().then();
            }
        }
    }, [isTokenVerified]);

    useEffect(() => {
        if(isTokenVerified && !user){
            router.push('/').then();
        }
    }, [user]);

    useEffect(() => {
        if(mediaCards.length > 0){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else if(mediaCards.length === 0 && mediaSearchState.isSearchEmpty){
            setMediaSearchState({...mediaSearchState,isLoading:false});
        }else{
            setMediaSearchState({...mediaSearchState,isLoading:true});
        }
    } , [mediaCards]);

    return(
        <main>
            {isLoading ?
                <div className="flex flex-col justify-center items-center h-[80vh] mt-[10vh]"><Loader/></div>
                :
                <VerticalItemsShowcase medias={mediaCards}  mediaSearchState={mediaSearchState} title = "films préférés : " handlePageChange={handlePageChange}/>
            }
        </main>
    );
}
export default Likes;
