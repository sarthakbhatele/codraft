'use client'
import React, { useState } from 'react'

const MAX_ROWS = 8
const MAX_COLS = 8

export default function TableGridSelector({ onInsert }: { onInsert: (rows: number, cols: number) => void }) {
    const [hovered, setHovered] = useState({ rows: 0, cols: 0 })

    return (
        <div className="p-2">
            <div className="grid grid-cols-8 gap-0.5">
                {[...Array(MAX_ROWS)].map((_, rowIdx) =>
                    [...Array(MAX_COLS)].map((_, colIdx) => {
                        const isActive = rowIdx <= hovered.rows && colIdx <= hovered.cols
                        return (
                            <div
                                key={`${rowIdx}-${colIdx}`}
                                onMouseEnter={() => setHovered({ rows: rowIdx, cols: colIdx })}
                                onClick={() => onInsert(rowIdx + 1, colIdx + 1)}
                                className={`w-5 h-5 border border-gray-300 ${isActive ? 'bg-blue-500' : 'bg-white'} cursor-pointer`}
                            />
                        )
                    })
                )}
            </div>
            <div className="text-xs text-center mt-1 text-gray-600">
                {hovered.rows + 1} x {hovered.cols + 1}
            </div>
        </div>
    )
}
