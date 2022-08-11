import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";


export default function LoginView() {

  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
  const [user, setUser] = useState(null);

  const handleSubmit = async () => {
    try{process.env.NEXT_PUBLIC_BASE_URL
      router.push(url)
    }catch(e){
      console.log(e)
    }

  }

	return (
    <div className="flex h-screen justify-center items-center">
		<div className="bg-white text-black p-3 w-[400px] rounded">
			<div className="flex flex-col items-center py-6">
				<h1 className="text-2xl mb-2 font-semibold">
					Hey there, welcome to Whatsclon
				</h1>
				<Image
					src="/images/whatsclon.png"
					alt="Whatsapp"
					width={50}
					height={50}
				/>
				<h2 className="my-6 text-xl font-semibold">Its a personal project</h2>
				<p className="text-center">
					My goal is to recreate certain features of WhatsApp for learning
					purposes
				</p>
			</div>

			<div className="flex flex-col items-center">
				<p className="mt-4 mb-4 font-semibold">Only need a google account & enjoy !</p>
				<div className="mx-auto">
					<button onClick={handleSubmit} className="w-[300px] h-[50px] bg-gray-700 hover:bg-gray-800 transition delay-100 duration-300 ease-in-out rounde-lg flex justify-center items-center">
						<Image
							src="/images/google.png"
							alt="Google"
							width={30}
							height={30}
						/>
						<span className="mx-6 text-white">SIGN IN WITH GOOGLE</span>
					</button>
				</div>
			</div>

      <div className="mt-10 mb-2 text-center">
      <p className="font-semibold">If you want know more about this</p>
      <span className="text-sm">sebastianceliamores@gmail.com</span>
      </div>
		</div>
    </div>
	);
}
