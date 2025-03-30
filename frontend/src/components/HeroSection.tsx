import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import PromptEffect from "./PromptEffect";
import { useNavigate } from "react-router";

//icons
import DoDisturbOnRoundedIcon from '@mui/icons-material/DoDisturbOnRounded'; // min
import CancelIcon from '@mui/icons-material/Cancel'; //close
export function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen flex flex-row max-w-4xl mt-40">
            {/* <div className="w-2/5 h-2/3 border border-amber-500"> */}

            <div className="w-2/5 h-[300px] border border-amber-500">
            </div>
            <div>
                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ={50}
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            FitHub
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ={60}
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-left"
                        >
                            Simply describe your meal in natural language, and we'll handle the rest.
                        </CardItem>
                        <CardItem translateZ={100} className="w-full mt-4">
                            {/* <img
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                        loading="lazy"
                    /> */}

                            <div className="h-60 w-full object-cover rounded-xl bg-[#a5a5a5] p-4 group-hover/card:shadow-xl"
                            >
                                <div className="flex">
                                    <DoDisturbOnRoundedIcon style={{ color: "red" }} />
                                    <CancelIcon style={{ color: "green" }} />
                                </div>
                                <PromptEffect />
                            </div>

                        </CardItem>
                        <div className="flex justify-between items-center mt-20">
                            <CardItem
                                translateZ={20}
                                as="a"
                                href="https://github.com/siddharthaasal/fitness-hub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                            >
                                Source Code →
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                as="button"
                                type="button"
                                onClick={() => navigate("/signin")}
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer hover:bg-amber-700"
                            >
                                Login
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer >
            </div>


        </div >

    );
}

export default HeroSection;
