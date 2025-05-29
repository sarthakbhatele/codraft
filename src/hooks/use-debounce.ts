import { useCallback, useRef } from "react";

export function useDebounce<
    T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay)
        },
        [callback, delay]
    )
}


// import { useCallback, useRef } from "react";
// export function useDebounce<T extends (...args: any[]) => void>(
//     callback: T,
//     delay: number = 500
// ) {
//     const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

//     const debounced = useCallback(
//         (...args: Parameters<T>) => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }

//             timeoutRef.current = setTimeout(() => {
//                 callback(...args);
//             }, delay);
//         },
//         [callback, delay]
//     );

//     // Cancel function to stop pending timeout
//     (debounced as any).cancel = () => {
//         if (timeoutRef.current) {
//             clearTimeout(timeoutRef.current);
//         }
//     };

//     return debounced as T & { cancel?: () => void };
// }
