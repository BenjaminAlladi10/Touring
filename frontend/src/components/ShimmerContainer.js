export default function ShimmerContainer()
{
    return(
        <div className="w-[88%] mx-auto my-4 flex flex-row flex-wrap justify-evenly gap-4">
            {
                Array(10).fill(" ").map((value,index)=> <ShimmerCard ind={index} key={index}/>)
            }
        </div>
    );
}

export function ShimmerCard({ind})
{
    return (
        <div className="w-[15rem] h-[16rem] p-[0.6rem] rounded-lg shadow-lg cursor-pointer font-[PT Sans, Calibri, sans-serif] text-ellipsis overflow-hidden hover:scale-[0.98] animate-pulse" key={ind}>
            <div className="h-[45%] bg-[#dad8d8] rounded-lg mb-4"></div>

            <h3 className="h-[0.6rem] bg-[#dad8d8] rounded-[0.2rem] mb-[0.3rem]">{}</h3>
            <h5 className="h-[0.6rem] bg-[#dad8d8] rounded-[0.2rem] mb-[0.3rem]">{}</h5>
            <h5 className="h-[0.6rem] bg-[#dad8d8] rounded-[0.2rem] mb-[0.3rem]">{}</h5>
            <h5 className="h-[0.6rem] bg-[#dad8d8] rounded-[0.2rem] mb-[0.3rem]">{}</h5>
            <h5 className="h-[0.6rem] bg-[#dad8d8] rounded-[0.2rem] mb-[0.3rem] w-[80%]">{}</h5>

            <ul className="flex justify-evenly items-center font-semibold font-[PT Sans, Calibri, sans-serif] font-[1rem] my-0 h-6 bg-[#d5d4d4] mt-[1.2rem] list-none">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}