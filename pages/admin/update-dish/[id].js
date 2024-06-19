import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import { connectToDatabase } from "@/pages/components/utils/mongodb";
import { ObjectId } from "bson";
import NormalToast from "@/pages/components/utils/NormalToast";
import Head from "next/head";
import withAdminAuth from "@/pages/components/withAdminAuth";
import { notFound } from "next/navigation";

function UpdateDish({ dish, categories }) {
    const [disabled, setdisabled] = useState(false)
    const [title, settitle] = useState(dish?.title)
    const [description, setdescription] = useState(dish?.description)
    const [price, setprice] = useState(dish?.price)
    const [image, setimage] = useState(dish?.image)
    const [category, setcategory] = useState(dish?.category)
    const router = useRouter()
    const formhandler = (e) => {
        e.preventDefault();
        setdisabled(true);
        axios.post('/api/admin/update-dish', {
            _id: router.query.id,
            title,
            description,
            price,
            image,
            category
        })
            .then((res) => {
                NormalToast('Dish Updated successfully')
                setdisabled(false)
            })
            .catch((err) => {
                NormalToast('Something went wrong', err)
                console.error(err)
                setdisabled(false)
            })
    }
    return (
        <>
            <Head>
                <title>FleeFushion | Update Dish</title>
            </Head>
            <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
                <div className="mx-auto max-w-screen-sm sm:text-base text-sm">
                    <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-6">
                        Update Dish
                    </h2>
                    <form onSubmit={formhandler} className="flex flex-col gap-4">
                        <input type="text" required value={title} placeholder="Title" className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md outline-none" onChange={(e) => settitle(e.target.value)} disabled={disabled} />
                        <select required className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md outline-none capitalize" onChange={(e) => setcategory(e.target.value)} disabled={disabled}>
                            {categories.map((category) => (
                                <option value={category.name} key={`category-${category._id}`}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                        <textarea required placeholder="Description" className="bg-gray-100 py-2 px-4 border border-gray-200 rounded-md h-24 resize-none outline-none" value={description} onChange={(e) => setdescription(e.target.value)} cols="25" rows="10" disabled={disabled}></textarea>
                        <input type="number" required placeholder="Price" className="bg-gray-100 py-2 border border-gray-200 px-4 rounded-md outline-none" value={price} onChange={(e) => setprice(e.target.value)} disabled={disabled} />
                        <input type="text" required placeholder="Image Url" className="bg-gray-100 py-2 px-4 border border-gray-200 rounded-md outline-none" value={image} onChange={(e) => setimage(e.target.value)} disabled={disabled} />
                        <button type="submit" className={`button py-2 px-10 sm:text-base text-sm mt-4 ${disabled ? "opacity-50" : ''}`} disabled={disabled}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default withAdminAuth(UpdateDish)

export const getStaticPaths = async () => {
    const { db } = await connectToDatabase()
    const dishes = await db.collection('dishes').find({}).toArray();
    const paths = dishes.map((dish) => ({
        params: { id: dish._id.toString() }
    }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    let dish;
    let categories;
    try {
        const { db } = await connectToDatabase()
        dish = await db.collection('dishes').findOne({ _id: new ObjectId(context.params.id) })
        categories = await db.collection('categories').find({}).toArray();
    }
    catch (err) {
        console.error(err)
        return {
            notFound: true
        }
    }
    if (!dish) {
        return {
            notFound: true
        }
    }
    dish = JSON.parse(JSON.stringify(dish))
    categories = JSON.parse(JSON.stringify(categories))

    return {
        props: {
            dish,
            categories
        },
        revalidate: 1
    }

}


