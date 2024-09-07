
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 

export default function RecordValuesToolTip(props){

    const {value} = props;
     
    return ( <> 
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p style={{
            fontSize: "0.8rem",
          }} variant="outline" className="px-4 w-24 truncate rounded-full  bg-gray-700 text-white hover:bg-gray-500 hover:text-white hover:cursor-pointer">{value}</p>
            {/* <Button  style={{
            fontSize: "0.5rem",
          }} variant="outline" className="px-2 w-24 truncate rounded-full  bg-gray-800 text-white hover:bg-gray-700 hover:text-white ">{value}</Button> */}
          </TooltipTrigger>
          <TooltipContent className="shadow-md shadow-pink-200">
            <p    style={{
            fontSize: "1.0rem",
          }}
          // bg-gradient-to-r from-gray-700 via-gray-900 to-black
          className="text-gray-600 rounded-full">{value}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </>)
}