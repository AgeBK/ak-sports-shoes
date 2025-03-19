import React from "react";
import Carousel from "./Carousel";
import { fetchCarouselProducts } from "../lib/data";

export default async function CarouselMain() {
  const data = await fetchCarouselProducts();
  return <Carousel data={data} />;
}
