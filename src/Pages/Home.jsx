import { Suspense } from "react";
import { getloader } from "../Context/LoadingContext";

function Home() {
  const { Carousel, Category, Features } = getloader();
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel />

        <Category />
        <Features />
      </Suspense>
    </div>
  );
}

export default Home;
