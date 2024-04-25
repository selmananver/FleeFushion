
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
function Dish({ _id, title, price, description, category, image }) {

 

  return (
      <div className="relative flex flex-col   bg-white z-20  md:p-8 p-6 rounded-md shadow-lg">
        <p className="absolute top-2 right-3 text-xs italic text-gray-400 capitalize">
          {category}
        </p>
        <Image
          src={image}
          height={300}
          width={300}
          alt=""
          objectFit="cover"
          objectPosition="center"
        />
        <h4 className="my-3 font-medium capitalize">
          {title}
        </h4>
        <p className="text-xs  mb-2 line-clamp-2 text-gray-500">
          {description}
        </p>
        <div className="mb-5 mt-2 font-bold text-gray-700">
          <Currency quantity={price} currency="INR" />
        </div>
        <button
          className="mt-auto button flex items-center justify-center"
        >
        
          <span className="ml-2">Add to Cart</span>
        </button>
      </div>
  );
}

export default Dish;
