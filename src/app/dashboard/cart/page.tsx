import { getCookieCart } from '@/shopping-cart/actions/actions'
import { ItemCard } from '@/shopping-cart/components/ItemCard'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Cart Page',
  description: 'Page to manage cart',
}

const CartPage = async () => {
  const cookieCart = (await cookies()).get('cart')?.value

  const cookieCartObject = JSON.parse(cookieCart as string)

  const cookieCartArray = []

  for (const key in cookieCartObject) {
    cookieCartArray.push({ id: key, quantity: cookieCartObject[key] })
  }
  console.log(cookieCartArray)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">Productos en el carrito</h1>
      <hr className="border-gray-300 mb-10" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {cookieCartArray.map((item) => (
          <ItemCard key={item.id} product={item.id} quantity={item.quantity} />
        ))}
      </div>
    </div>
  )
}

export default CartPage
