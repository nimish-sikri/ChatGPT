import { LoginFooter } from "./login-footer";

interface CardWraperProps{
    children: React.ReactNode;
}

const CardWraper = ({
    children
} : CardWraperProps) => {
    return ( 
        <div className="w-[70%] h-auto flex flex-col justify-between">
            <div className="w-full h-[15%] flex items-center justify-center">
                <p className="text-5xl font-bold p-4 text-[#4FA480] flex items-start">ChatGPT<span className="text-[20px] ml-2">&#174;</span></p>
            </div>
            <div className="w-full h-[85%]">
                {children}
            </div>
        </div>
    );
}
 
export default CardWraper;