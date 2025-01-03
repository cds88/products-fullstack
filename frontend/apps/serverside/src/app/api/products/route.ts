import { axiosClient } from "@/utils/axiosClient";

import { NextRequest, NextResponse } from "next/server";
 
const URL_ENDPOINT = "/api/products";

export async function POST(req: NextRequest) {
  try {
    console.log("------------------------------------------------------------process env--------------------", process.env.NEXT_PUBLIC_BASE_URL)

    const params = await req.json();

 


    const response = await axiosClient.get(URL_ENDPOINT, { params });
    
    return NextResponse.json(response.data["$values"]);
  } catch (error) {
    console.error(error);
  }
}
