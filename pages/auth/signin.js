import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
import Logo from "../../img/logo.webp";

// Running on browser
function signin({ providers }) {
  return (
    <>
        <Header />
        <div className="flex flex-col items-center justify-center min-w-screen py-2 mt-20 px-14 text-center">
            <img className="w-80" src="http://localhost:3000/_next/image?url=https%3A%2F%2Flinks.papareact.com%2Focw&w=1200&q=75" />
            <div className="mt-40">
                {Object.values(providers).map(provider => (
                    <div key={provider.name}>
                        <button className='p-3 bg-blue-500 rounded-lg text-white' onClick={() => signIn(provider.id, {callbackUrl: "/"})}>Sign in wih {provider.name}</button>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

// On middle server
export async function getServerSideProps() {
    const providers = await getProviders();
    
    return {
        props: {
            providers, 
        }
    }
}

export default signin