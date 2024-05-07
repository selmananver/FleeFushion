import About from './components/About'
import Banner from './components/Banner'
import Info from './components/Info'
import FoodGallery from './components/FoodGallery'
import HowitWork from './components/HowitWork'
import Menu from './components/Menu'
import Testimonials from './components/Testimonials'
import { connectToDatabase } from './components/utils/mongodb'
import getDishes from './components/utils/getDishes'
import getCategories from './components/utils/getCategories'


export default function Home({dishes,categories}) {
  const {dishes:clientdishes, error } = getDishes(dishes);
  const {categories:clientcategories, error: err } = getCategories(categories)
  if (err) {
    console.error(err);
  }

  if (error) {
    console.error(error)
  }
  return (
    <><Banner /><About /><Info /><FoodGallery /><HowitWork /><Menu dishes={dishes} categories={categories} /><Testimonials /></>
  );
}
export const getStaticProps = async () => {
  const { db } = await connectToDatabase()
  let dishes = await db.collection("dishes").find({}).toArray()
  dishes = JSON.parse(JSON.stringify(dishes))
  let categories = await db.collection("categories").find({}).toArray()
  categories = JSON.parse(JSON.stringify(categories))
  return {
    props: {
      dishes,
      categories
    },
  }
}
