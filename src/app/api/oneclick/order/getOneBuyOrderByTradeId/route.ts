import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

const stableUrlStable = 'https://www.stable.makeup';

const stableUrlGeorgia = 'https://georgia.stable.makeup';

const stableUrlXlay = 'https://xlay-tether.vercel.app/';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    tradeId,
    stabilityId,
  } = body as { tradeId: string; stabilityId?: string; };
  // call api

  console.log("getOneBuyOrderByTradeId tradeId", tradeId);
  console.log("getOneBuyOrderByTradeId stabilityId", stabilityId);

  // call api
  let apiUrl = `${stableUrlGeorgia}/api/order/getOneBuyOrderByTradeId`;

  if (stabilityId === '150b53f165222304af7c45dc45c73863') {
    apiUrl = `${stableUrlStable}/api/order/getOneBuyOrderByTradeId`;
  } else if (stabilityId === '9ed089930921bfaa1bf65aff9a75fc41') {
    apiUrl = `${stableUrlGeorgia}/api/order/getOneBuyOrderByTradeId`;
  } else if (stabilityId === 'd140e95d67da87ff62efabf401171aa0') {
    apiUrl = `${stableUrlXlay}/api/order/getOneBuyOrderByTradeId`;
  }

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
