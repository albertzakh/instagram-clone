import Image from "next/image";
import { 
    SearchIcon,
    PlusCircleIcon,
    UserGroupIcon,
    HeartIcon,
    MenuIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline"

import { HomeIcon } from "@heroicons/react/solid";

import { useSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {
    const {data: session} = useSession();
    const router = useRouter();

    const [open, setOpen] = useRecoilState(modalState)

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50 py-3 px-3">
        <div className="flex justify-between bg-white max-w-6xl xl:mx-auto">
            <div onClick={() => router.push("/")} className="relative hidden lg:inline-grid w-24 cursor-pointer">
                <Image src="https://links.papareact.com/ocw"
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div onClick={() => router.push("/")} className="relative w-10 h-10 lg:hidden flex-shrink-0 cursor-pointer">
                <Image src="https://links.papareact.com/jjm"  
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div className="max-w-xs">
                <div className="flex items-center border-2 border-black h-10 rounded-md">
                    <div className="px-2">
                        <SearchIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input className="focus:ring-black focus:bo outline-none border-none pr-3" type="text" placeholder="Search" />
                </div>
            </div>

            <div className="flex items-center justify-end space-x-4">
                <HomeIcon onClick={() => router.push("/")} className="navBtn " />
                <MenuIcon className="h-6 md:hidden" />

            {session ? (
                <>
                <div className="relative navBtn">
                    <PaperAirplaneIcon className="navBtn" />
                    <div className="absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</div>
                </div>


                <PlusCircleIcon onClick={() => setOpen(true)} className="navBtn" />
                <UserGroupIcon className="navBtn" />
                <HeartIcon className="navBtn" />

                <img onClick={signOut} src={session?.user?.image} alt="profile pic" className="h-10 w-10 rounded-full cursor-pointer" />
                </>
            ) : <button onClick={signIn}>Sign In</button>}                
            </div>
        </div>        
    </div>
  )
}

export default Header