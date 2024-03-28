import React from "react";

const MovieItemSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col mb-10 mt-5">
            <div
                className="skeleton rounded-t-3xl rounded-b-none min-h-[250px] min-w-[175px] bg-white bg-opacity-[4%]"></div>
            <div
                className="skeleton rounded-b-3xl rounded-t-none min-h-[129px] min-w-[175px] relative bg-white bg-opacity-[4%]">
                <div
                    className="skeleton rounded-full shrink-0 h-[40px] w-[40px] absolute bottom-[82%] left-[6%] bg-black bg-opacity-[90%]"></div>
                <div className="pt-8 ml-2 mr-5">
                    <div className="skeleton h-5 w-full bg-black bg-opacity-[90%]"></div>
                    <div className="skeleton h-4 w-full mt-1 bg-black bg-opacity-[90%]"></div>
                </div>
            </div>
        </div>
    )
}
export default MovieItemSkeleton;
