import Image from "next/image"
import Link from "next/link"
import SearchInput from "./search-input"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between h-full w-full gap-x-6">
            <div className="flex gap-3 items-center shrink-0 pr-6">
                <Link href={'/'}>
                    {/* <Image src={'/logo.svg'} alt="logo" width={40} height={40} /> */}
                    <Image src={'/codraft.jpeg'} alt="logo" width={70} height={60} />
                </Link>
            </div>
            <SearchInput />

            <div className="flex gap-3 items-center">
                <OrganizationSwitcher
                afterCreateOrganizationUrl={'/'}
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl={'/'}
                afterSelectPersonalUrl={'/'}
                />
                <UserButton />
            </div>

        </nav>
    )
}
export default Navbar

