// import{ parseAsString, useQueryState} from "nuqs";

// export function useSearchParam(key: string) {
//   return useQueryState(
//     key,
//     parseAsString.withDefault("").withOptions({
//         clearOnDefault: true
//     })
//   )
// }

import{ parseAsString, useQueryState} from "nuqs";

export function useSearchParam() {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
        clearOnDefault: true
    })
  )
}
