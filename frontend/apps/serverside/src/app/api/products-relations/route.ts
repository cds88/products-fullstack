import { axiosClient } from "@/utils/axiosClient";
import { Brand, Category, Tag } from "@products/types";
import { NextResponse } from "next/server";

const URL_ENDPOINT = "/api/products/relations";

export async function GET( ) {
  try {
    const response = await axiosClient.get(URL_ENDPOINT);
    const data = response.data;
 
    const results = {
      categories: data.categories.$values.map(({ id, name }: Category) => ({
        id,
        name,
      })),
      brands: data.brands.$values.map(({ id, name }: Brand) => ({ id, name })),
      tags: data.tags.$values.map(({ id, name }: Tag) => ({ id, name })),
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
  }
}
