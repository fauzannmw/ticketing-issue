import { RiAiGenerate, RiSpam2Fill } from "react-icons/ri";
import { FaRegThumbsUp, FaLink, FaShieldAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineDevicesOther } from "react-icons/md";

export default function oalzPage() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center pt-6 gap-4">
      <div className="lg:w-1/2 lg:min-h-36 flex flex-col justify-center items-center px-4 py-2 gap-4 bg-white rounded-md">
        <h1 className="text-xl font-semibold">
          Oalz Shortlink | Free & Safety Shortlink
        </h1>
        <form action="" className="grid grid-cols-3 gap-4">
          <input
            type="url"
            placeholder="Enter URL..."
            id="original_url"
            name="original_url"
            className="col-span-2 px-3 py-1.5 border-2 border-neutral-800 rounded-md"
          />
          <button className="col-span-1 flex items-center justify-center px-3 py-1.5 gap-2 bg-neutral-800 rounded-md text-white">
            Create Shortlink
            <span>
              <RiAiGenerate />
            </span>
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 lg:min-h-36 flex flex-col justify-center items-center px-4 py-2 gap-4 bg-white rounded-md">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold">Apa itu Shortlink?</h1>
          <p className="">
            Shortlink, atau tautan pendek, adalah versi singkat dari URL asli.
            Ini diciptakan untuk mempersingkat tautan yang panjang dan sulit
            diingat menjadi bentuk yang lebih ringkas dan mudah diakses. Sebagai
            contoh, dari
            “https://www.namawebsiteanda.com/artikel/strategi-pemasaran-digital”
            menjadi “https://short.link/123xyz“. Penggunaan shortlink tidak
            hanya memberikan kenyamanan, tetapi juga dapat memainkan peran
            penting dalam meningkatkan peringkat website Anda di hasil pencarian
            Google.
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 lg:min-h-36 flex flex-col justify-center items-center px-4 py-2 gap-4 bg-white rounded-md">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold">Kenapa harus Oalz?</h1>
          <p className="font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            voluptatibus rem est inventore suscipit veniam ex, perferendis dicta
            cupiditate quas nisi officiis minima asperiores quia voluptates
            alias eaque neque nam?
          </p>
        </div>
        <div className="w-full min-h-36 grid grid-cols-3 gap-4 rounded-md">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <FaRegThumbsUp className="text-2xl" />
            <h1 className="text-lg font-semibold">Easy</h1>
            <p className="text-sm text-center">
              ShortURL mudah dan cepat, masukkan tautan panjang untuk
              mendapatkan tautan singkat Anda
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <FaLink className="text-2xl" />
            <h1 className="text-lg font-semibold">Shortened</h1>
            <p className="text-sm text-center">
              Gunakan tautan apa pun, berapa pun ukurannya, ShortURL selalu
              dipersingkat
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <FaShieldAlt className="text-2xl" />
            <h1 className="text-lg font-semibold">Secure</h1>
            <p className="text-sm text-center">
              Cepat dan aman, layanan kami memiliki protokol HTTPS dan enkripsi
              data
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <BsGraphUpArrow className="text-2xl" />
            <h1 className="text-lg font-semibold">Statistics</h1>
            <p className="text-sm text-center">
              Dorong pertumbuhan lalu lintas situs web Anda
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <RiSpam2Fill className="text-2xl" />
            <h1 className="text-lg font-semibold">Reliable</h1>
            <p className="text-sm text-center">
              Semua tautan yang mencoba menyebarkan spam, virus, dan malware
              akan dihapus
            </p>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <MdOutlineDevicesOther className="text-2xl" />
            <h1 className="text-lg font-semibold">Devices</h1>
            <p className="text-sm text-center">
              Kompatibel dengan ponsel cerdas, tablet, dan desktop
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:min-h-12 flex justify-center items-center bg-neutral-900">
        <h1 className="text-white">
          © 2024 Oalz.com - Your shorten link solution
        </h1>
      </div>
    </div>
  );
}
