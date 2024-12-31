import { axiosClient } from "@/utils/axiosClient";
import { NextResponse } from "next/server";

const URL_ENDPOINT = "/api/products";

export async function GET() {
  try {
    const result = await axiosClient.get(URL_ENDPOINT);

    return NextResponse.json(result.data);
  } catch (error) {
    console.error(error);
  }
}
