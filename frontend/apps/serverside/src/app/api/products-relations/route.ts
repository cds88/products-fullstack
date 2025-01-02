import { axiosClient } from "@/utils/axiosClient";
import { NextRequest, NextResponse } from "next/server";


const URL_ENDPOINT = "/api/products/relations";


export async function GET(req: NextRequest)
{
    try {
            const results = await axiosClient.get(URL_ENDPOINT)

            return NextResponse.json(results.data)
    } catch (error) {
        console.error(error)
    }
}