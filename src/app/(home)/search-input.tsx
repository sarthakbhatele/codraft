'use client'
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, XIcon } from "lucide-react"
import { useSearchParam } from "@/hooks/useSearchParam"


const SearchInput = () => {

  // for searching 
  const [search, setSearch] = useSearchParam()
  const [value, setValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearch(e.target.value) // live search
  }

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-700 px-14 w-full border-none focus-visible:ring-0 focus:bg-white rounded-full h-[48px] bg-[#F0F4F8] focus:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)]"
        />

        <Button
          type="submit"
          variant={'ghost'}
          size={'icon'}
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full cursor-pointer"
        >
          <SearchIcon />
        </Button>

        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant={'ghost'}
            size={'icon'}
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full cursor-pointer"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  )
}
export default SearchInput