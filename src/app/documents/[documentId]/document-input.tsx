import { BsCloudCheck } from "react-icons/bs"
const DocumentInput = () => {
    return (
        <div className="flx items-center gap-2">
            <span className="text-lg px-1.5 cursor-pointer truncate">Untitled Document</span>
            <BsCloudCheck />
        </div>
    )
}
export default DocumentInput 