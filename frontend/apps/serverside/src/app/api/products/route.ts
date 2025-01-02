import { axiosClient } from "@/utils/axiosClient";

import { NextResponse, NextRequest } from "next/server";
import queryString from "query-string";
 
const URL_ENDPOINT = "/api/products";

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();

 


    const response = await axiosClient.get(URL_ENDPOINT, { params });
    
    return NextResponse.json(response.data["$values"]);
  } catch (error) {
    console.error(error);
  }
}
