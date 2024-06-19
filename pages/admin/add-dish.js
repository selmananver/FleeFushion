import { useState } from "react";
import axios from 'axios'
import { connectToDatabase } from "../components/utils/mongodb";
import Head from "next/head";
import withAdminAuth from "../components/withAdminAuth";
import NormalToast from "../components/utils/NormalToast";


function AddDish({categories}){
    const [disabled,setdisabled] =useState(false)
    const[title,settitle] =useState('')
    const [description,setdescription] =useState('')
    const[price,setprice] =useState('')
    const[image,setimage] =useState('')
    const [category,setcategory] =useState(categories[0]?.name || '')
    const formhandler=(e)=>{
        e.preventDefault()
        setdisabled(true)
        axios.post('/api/admin/add-dish',{
            title,
            category,
            description,
            price,
            image
        })
        .then((res)=>{
            NormalToast('Dish added successfully')
            settitle('')
            setcategory('')
            setdescription('')
            setprice('')
            setimage('')
            setdisabled(false)
        })
        .catch((err)=>{
            NormalToast('Something went wrong',true)
            console.error(err)
            setdisabled(false)
        })
    }

    return (
        <>
        <Head>
        <title>FleeFusion | Add Dish</title>
        </Head>
        <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
            <div className="mx-auto max-w-screen-sm sm:text-base text-sm">
                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold mb-6">
                    Add Dish
                </h2>
                <form onSubmit={formhandler} className="flex flex-col gap-4">
                    <input type="text" required value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title" className="bg-gray-100 py-2 px-4 rounded-md outline-none border border-gray-200" disabled={disabled}/>
                    <select required className="bg-gray-100 py-2 px-4 rounded-md outline-none border border-gray-200 caputalize" onChange={(e)=>setcategory(e.target.value)} disabled={disabled}>
                        {categories?.map((category)=>(
                            <option value={category.name} key={`option -${category._id}`}>
                            {category.name}
                            </option>
                        ))}
                        </select>
                        <textarea required placeholder="Description" className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md resize-none h-24 outline-none" value={description} cols='25'rows='10' disabled={disabled} onChange={(e)=>setdescription(e.target.value)}></textarea>
                        <input type="number" required placeholder="Price" className="bg-gray-100 border py-2 px-4 rounded-md outline-none border-gray-200" value={price} onChange={(e)=>setprice(e.target.value)} disabled={disabled}/>
                        <input type="text" required placeholder="Image Url" className="bg-gray-100 py-2 px-4 border rounded-md outline-none border-gray-200" value={image} onChange={(e)=>setimage(e.target.value)} disabled={disabled}/>
                        <button type ="submit" className={`button py-2 px-10 sm:text-base text-sm mt-4 ${disabled ?"opacity-50":''}`} disabled={disabled}>Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}
export default withAdminAuth(AddDish)

export const getStaticProps= async()=>{
    const {db } =await connectToDatabase()
    let categories = await db.collection('categories').find({}).toArray()
    categories =JSON.parse(JSON.stringify(categories))
    return {
        props:{
            categories
        },
        revalidate:1
    }
}