import { TypewriterEffect } from "./ui/typewriter-effect";

export default function PromptEffect() {
    const words = [
        {
            text: "I",
        },
        {
            text: "ate",
        },
        {
            text: "4",
        },
        {
            text: "slices",
        },
        {
            text: "of",
        },
        {
            text: "whole",
        },
        {
            text: "wheat",
        },
        {
            text: "bread",
        },
        {
            text: "smeared",
            className: "text-blue-500 dark:text-blue-500",

        }, {
            text: "with",
            className: "text-blue-500 dark:text-blue-500",

        }, {
            text: "butter",
            className: "text-blue-500 dark:text-blue-500 ",

        },
    ];
    return (

        <TypewriterEffect words={words} className="text-xs sm:text-sm" />
    );
}
