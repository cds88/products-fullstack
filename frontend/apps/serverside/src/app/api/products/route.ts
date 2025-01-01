import { axiosClient } from "@/utils/axiosClient";

import { NextResponse, NextRequest } from "next/server";



const URL_ENDPOINT = "/api/products";



export async function POST(req: NextRequest) {
  try {
 
    const params =await req.json();
    console.log("params are", params)
     const result = await axiosClient.get(URL_ENDPOINT, params);

    return NextResponse.json(result.data);
  } catch (error) {
    console.error(error);
  }
}
