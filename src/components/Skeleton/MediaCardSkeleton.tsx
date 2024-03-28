import React from "react";

const MediaCardSkeleton: React.FC = () => {
    return (
        <>
            {/*media-card*/}
            <div className="flex flex-col mb-[10px] mt-[5px] relative">
                {/*media-card-bg*/}
                <div
                    className="skeleton rounded-t-[15px] rounded-b-none min-h-[330px] max-h-[330px] min-w-[220px] max-w-[220px] bg-white bg-opacity-[4%]"></div>
                {/*media-card-details*/}
                <div
                    className="skeleton rounded-b-[15px] rounded-t-none min-w-[220px] max-w-[220px] h-[120px] bg-white bg-opacity-[4%]">
                    <div
                        className="skeleton rounded-full shrink-0 h-[40px] w-[40px] absolute top-[68.3%] left-[6%] z-[2] bg-black bg-opacity-[90%]"></div>
                    <div className="pt-8 ml-2 mr-5">
                        <div className="skeleton h-5 w-full bg-black bg-opacity-[90%]"></div>
                        <div className="skeleton h-4 w-full mt-1 bg-black bg-opacity-[90%]"></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MediaCardSkeleton;
