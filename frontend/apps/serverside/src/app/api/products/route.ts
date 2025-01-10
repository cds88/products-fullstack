import { axiosClient } from "@/utils/axiosClient";

import { NextRequest, NextResponse } from "next/server";

const URL_ENDPOINT = "/odata/products";

export async function POST(req: NextRequest) {
  try {
    const params = await req.json();

    const response = await axiosClient.get(URL_ENDPOINT, { params:{...params, $count: true} });

    const result = {
      data: response.data["value"],
      totalCount: response.data["@odata.count"],
     }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
  }
}
