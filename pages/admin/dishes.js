import { useState, useEffect } from "react";
import { connectToDatabase } from "../components/utils/mongodb";
import Head from "next/head";
import DishInfo from "../components/DishInfo";
import withAdminAuth from "../components/withAdminAuth";

function Dishes({ dishes }) {
    const [searchterm, setsearchterm] = useState('');
    const [searchresult, setsearchresult] = useState(dishes || []);
    const [localdishes, setlocaldishes] = useState(dishes || [])

    const options = {
        keys: ["title", "description", "category"],
        threshold: 0.3
    };

    const searchdish = (e) => {
        const term = e.target.value;
        setsearchterm(term);
    };

    const removefromsearchresults = (_id) => {
        setlocaldishes((prevDishes) => prevDishes.filter((dish) => dish._id !== _id))
        setsearchresult((prevResults) => prevResults.filter((dish) => dish._id !== _id));
    };

    useEffect(() => {
        const loadfuse = async () => {
            const Fuse = (await import('fuse.js')).default;
            const fuse = new Fuse(localdishes, options);
            if (searchterm) {
                const result = fuse.search(searchterm.toLowerCase()).map(({ item }) => item);
                setsearchresult(result);
            } else {
                setsearchresult(localdishes);
            }
        };
        loadfuse();
    }, [searchterm, localdishes]);

    return (
        <>
            <Head>
                <title>FleeFushion | Orders</title>
            </Head>
            <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
                <div className="mx-auto max-w-screen-xl">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-6">
                        Dishes
                    </h2>
                    <div className="py-2">
                        <input
                            className="p-2 pl-6 h-full w-full outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200"
                            type="text"
                            value={searchterm}
                            placeholder="Search a dish"
                            onChange={searchdish}
                        />
                    </div>
                    <div className="overflow-y-auto hideScrollBar h-96 p-1">
                        {searchresult.map(
                            ({ _id, title, price, description, category, image, border }, i) => (
                                <DishInfo
                                    key={`order-${_id}`}
                                    _id={_id}
                                    title={title}
                                    price={price}
                                    description={description}
                                    category={category}
                                    image={image}
                                    border={i + 1 !== searchresult.length}
                                    removefromsearchresults={removefromsearchresults}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default withAdminAuth(Dishes);

export const getStaticProps = async () => {
    const { db } = await connectToDatabase();
    let dishes = await db.collection('dishes').find({}).toArray();
    dishes = JSON.parse(JSON.stringify(dishes));

    return {
        props: {
            dishes
        },
        revalidate: 1
    };
}
