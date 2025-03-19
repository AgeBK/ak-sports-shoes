import { sql } from "@vercel/postgres";
import { DataProps } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { cameliseArr, sentenceCase } from "./utils";

export async function fetchProducts() {
  // noStore() prevents the response from being cached. (good for dev) TODO
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes.");
  }
}

export async function fetchProductById(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *       
      FROM shoes
      WHERE id=${query}
      `;

    const product = data.rows[0];
    return product; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch product by id.");
  }
}

export async function fetchProductsByCategory(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      WHERE category=${query}
      `;

    const shoes = data.rows;
    return cameliseArr(shoes); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes by category.");
  }
}

export async function fetchProducstByCatSubCat(
  category: string,
  subCategory: string
) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT *        
      FROM shoes
      WHERE category=${sentenceCase(category)}
      AND sub_category=${sentenceCase(subCategory)}
      `;

    const shoes = data.rows;
    return cameliseArr(shoes); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch shoes by sub category.");
  }
}

export async function fetchCarouselProducts() {
  noStore();
  // fetch 12 random shoes that are on sale
  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes 
      WHERE percentage > 0
      ORDER BY RANDOM()
      LIMIT 12
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes.");
  }
}

export async function fetchCarouselProductsByVariety(query: string) {
  noStore();

  try {
    const data = await sql<DataProps>`
      SELECT * FROM shoes 
      WHERE variety=${query}
      LIMIT 12
      `;

    const shoes = data.rows;
    return cameliseArr(shoes);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel shoes by variety.");
  }
}
