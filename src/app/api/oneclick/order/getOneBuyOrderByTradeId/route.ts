import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

const stableUrl = 'https://georgia.stable.makeup';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    tradeId,
  } = body as { tradeId: string; };
  // call api
  const apiUrl = `${stableUrl}/api/order/getOneBuyOrderByTradeId`;

  //console.log("Fetching buy orders from:", apiUrl);
  //console.log("Request body:", body);


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    //console.log("Response data:", data);
    //console.log("Response data:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching buy orders:", error);
    return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: 500 });
  }
  
}
