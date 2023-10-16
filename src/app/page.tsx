import AllProducts from "@/components/others/AllProducts";
import FeaturedServices from "@/components/others/FeaturedServices";
import Subscribe from "@/components/others/Subscribe";
import CarouselAntd from "@/components/ui/CarouselAntd";

export default function HomePage() {
  return (
    <div>
      <CarouselAntd />
      <FeaturedServices />
      <AllProducts />
      <Subscribe />
    </div>
  );
}
