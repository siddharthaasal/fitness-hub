import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"



export default function AllMeals() {
    const [date, setDate] = React.useState<Date>();
    const [cleanedDate, setCleanedDate] = React.useState<any>();
    const [mealsData, setMealsData] = React.useState<any>();

    React.useEffect(
        () => {
            setDate(new Date());
        },
        []
    )
    React.useEffect(
        () => {
            setCleanedDate(cleanDate(date))
        },
        [date]
    )


    function cleanDate(date: Date | undefined) {
        if (date == undefined) {
            return null;
        }
        const days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = days[date.getDay()];
        const dateN = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const cleanedDate = `${dateN} ${month}, ${year} (${day})`;
        return cleanedDate;
    }

    function formatDateLocal(date: Date | undefined) {
        if (date == undefined) {
            return null;
        }
        const yyyy = date.getFullYear();

        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    async function fetchMeals() {
        console.log("Date in frontend:", date);
        const formattedDate = formatDateLocal(date);
        console.log("formatted date in frontend: ", formattedDate);
        const response = await axios.get(
            "http://localhost:3001/api/meals/get",
            {
                params: { date: formattedDate },
                withCredentials: true,
            }
        );
        console.log(response.data);
        // console.log(meals.data);
        // setMealsData(meals.data);
    }

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date > new Date()}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <button onClick={fetchMeals}>Fetch Meals</button>
            <div>
                <h1 className="bg-gray-200 mt-10">Showing all meals for {cleanedDate}</h1>
            </div>
        </>

    )
}

