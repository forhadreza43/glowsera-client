import ShopPage from "@/pages/ShopPage"
import { Suspense } from "react"

const Shop = () => {
  return (
    <Suspense fallback={null}>
      <ShopPage />
    </Suspense>
  )
}

export default Shop
