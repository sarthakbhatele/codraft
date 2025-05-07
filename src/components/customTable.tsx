'use client'
import React, { useState } from 'react'

export default function CustomTable({
    onInsert
}: {
    onInsert: (rows: number, cols: number) => void
}) {
    const [showCustomInput, setShowCustomInput] = useState(false)
    const [customRows, setCustomRows] = useState('')
    const [customCols, setCustomCols] = useState('')

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const rows = parseInt(customRows)
        const cols = parseInt(customCols)
        if (!isNaN(rows) && !isNaN(cols) && rows > 0 && cols > 0) {
            onInsert(rows, cols) // also closes dropdown
            setShowCustomInput(false)
            setCustomRows('')
            setCustomCols('')
        }
    }

    return (
        <div className="w-[180px]">
            <div className="mt-3 text-center">
                {!showCustomInput ? (
                    <button
                        onClick={() => setShowCustomInput(true)}
                        className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                        Custom
                    </button>
                ) : (
                    <form
                        onSubmit={handleCustomSubmit}
                        className="mt-2 flex flex-col gap-2 items-center"
                    >
                        <div className="flex gap-1">
                            <input
                                type="number"
                                placeholder="Rows"
                                value={customRows}
                                onChange={(e) => setCustomRows(e.target.value)}
                                className="w-14 px-1 py-0.5 text-sm border rounded"
                                min={1}
                            />
                            <input
                                type="number"
                                placeholder="Cols"
                                value={customCols}
                                onChange={(e) => setCustomCols(e.target.value)}
                                className="w-14 px-1 py-0.5 text-sm border rounded"
                                min={1}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded hover:bg-blue-600"
                            >
                                Insert
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCustomInput(false)}
                                className="text-sm text-gray-500 underline hover:text-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}


// 'use client'
// import React, { useState } from 'react'

// export default function CustomTable({
//     onInsert
// }: {
//     onInsert: (rows: number, cols: number) => void
// }) {
//     const [showCustomInput, setShowCustomInput] = useState(false)
//     const [customRows, setCustomRows] = useState('')
//     const [customCols, setCustomCols] = useState('')
//     const [errorMessage, setErrorMessage] = useState('') // State to track error message

//     const handleCustomSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         const rows = parseInt(customRows)
//         const cols = parseInt(customCols)

//         // Validate rows and cols
//         if (!customRows || !customCols || isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
//             setErrorMessage('Please enter valid positive numbers for rows and columns.')
//             return
//         }

//         // If valid, proceed with inserting the table and close the input form
//         onInsert(rows, cols)
//         setShowCustomInput(false)
//         setCustomRows('')
//         setCustomCols('')
//         setErrorMessage('') // Reset error message after successful submission
//     }

//     return (
//         <div className="w-[180px]">
//             <div className="mt-3 text-center">
//                 {!showCustomInput ? (
//                     <button
//                         onClick={() => setShowCustomInput(true)}
//                         className="text-sm text-blue-600 underline hover:text-blue-800"
//                     >
//                         Custom
//                     </button>
//                 ) : (
//                     <form
//                         onSubmit={handleCustomSubmit}
//                         className="mt-2 flex flex-col gap-2 items-center"
//                     >
//                         <div className="flex gap-1">
//                             <input
//                                 type="number"
//                                 placeholder="Rows"
//                                 value={customRows}
//                                 onChange={(e) => setCustomRows(e.target.value)}
//                                 className="w-14 px-1 py-0.5 text-sm border rounded"
//                                 min={1}
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Cols"
//                                 value={customCols}
//                                 onChange={(e) => setCustomCols(e.target.value)}
//                                 className="w-14 px-1 py-0.5 text-sm border rounded"
//                                 min={1}
//                             />
//                         </div>
                        
//                         {errorMessage && (
//                             <div className="text-sm text-red-500 mt-2">
//                                 {errorMessage}
//                             </div>
//                         )}

//                         <div className="flex gap-2">
//                             <button
//                                 type="submit"
//                                 className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded hover:bg-blue-600"
//                             >
//                                 Insert
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={() => setShowCustomInput(false)}
//                                 className="text-sm text-gray-500 underline hover:text-gray-700"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 )}
//             </div>
//         </div>
//     )
// }
