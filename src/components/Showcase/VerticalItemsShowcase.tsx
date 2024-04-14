import React, {useRef} from "react";
import MediaCard from "../Cards/MediaCard";
import Loader from "../utils/Loader";
import Paginations from "../utils/Paginations";
import {MediaCardProps, MediaSearchState} from "../../interfaces/UI";
interface VerticalItemsShowcase {
    medias: Array<MediaCardProps>
    mediaSearchState: MediaSearchState;
    title: string;
    handlePageChange: (event: React.ChangeEvent<unknown>, pageNumber: number) => void;
    activePage?: number;
}
const VerticalItemsShowcase: React.FC<VerticalItemsShowcase> = ({medias,mediaSearchState, title, handlePageChange, activePage}) => {
    const anchor = useRef<HTMLDivElement>(null);

    const handlePageChangee = async (e: React.ChangeEvent<unknown>, pageNumber: number) => {
        handlePageChange(e, pageNumber);
        if (anchor.current) {
            anchor.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
        {
            mediaSearchState.isLoading ?
                <div className="flex flex-col justify-center items-center h-[80vh] mt-[10vh]"><Loader/></div>
                : mediaSearchState.isSearchEmpty ?
                    <div className="flex flex-col justify-center items-center h-[80vh] mt-[10vh]">
                        <img id="noresult_logo" src="/noresult.png" alt="logo d'un paquet de pop corn triste" className="max-w-[150px] mb-1"/>
                        <p>{"La recherche n'a retourné aucun résultat."}</p>
                    </div>
                    :
                    <div className="category_movies mt-[10vh] flex flex-col justify-center items-center">
                            <h1 className="category_title self-start" ref={anchor}>{String(mediaSearchState.nbResults)} {title}</h1>
                            <ul id="vertical-list-showcase" className="">
                                {medias.map(media => (
                                    <MediaCard key={media.id} media={media}/>
                                ))}
                            </ul>
                            <div className="sticky bottom-0 z-[999] h-fit w-screen flex flex-row items-center justify-center">
                                <Paginations pages={mediaSearchState.nbPages} handlePageChange={handlePageChangee} activePage={activePage}/>
                            </div>
                        </div>
        }
        </>
    );
}
export default VerticalItemsShowcase;
