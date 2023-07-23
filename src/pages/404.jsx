import Link from "next/link";

function fourOhFour(props) {
  return (
    <div className="w-full flex flex-col text-center">
      <h1 className="text-xl font-bold text-white m-4">صفحه ای یافت نشد.</h1>
      <div className="flex flex-col pt-2 m-4">
        <p className="text-gray-500 text-sm truncate">
          <Link href={'/'} className="bg-white/5 p-4 inline-block rounded-md hover:bg-white/10" >
            بازگشت به صفحه اصلی
          </Link>
        </p>
      </div>
    </div>  
  )
};

export default fourOhFour;