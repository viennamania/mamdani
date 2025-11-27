import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';


const stableUrlStable = 'https://www.stable.makeup';

const stableUrlGeorgia = 'https://georgia.stable.makeup';

const stableUrlXlay = 'https://xlay-tether.vercel.app/';

export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    fromDate,
    toDate,
    limit,
    page,
    stabilityId,
    privateSale,
  } = body as { fromDate?: string; toDate?: string; limit?: number; page?: number; stabilityId?: string; privateSale?: boolean;  };





  // when fromDate is "" or undefined, set it to 30 days ago
  if (!fromDate || fromDate === "") {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    (body as any).fromDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  // when toDate is "" or undefined, set it to today
  if (!toDate || toDate === "") {
    const date = new Date();
    (body as any).toDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }


  // call api
  let apiUrl = `${stableUrlStable}/api/order/getAllBuyOrders`;

  if (stabilityId === '150b53f165222304af7c45dc45c73863') {
    apiUrl = `${stableUrlStable}/api/order/getAllBuyOrders`;
  } else if (stabilityId === '9ed089930921bfaa1bf65aff9a75fc41') {
    apiUrl = `${stableUrlGeorgia}/api/order/getAllBuyOrders`;
  } else if (stabilityId === 'd140e95d67da87ff62efabf401171aa0') {
    apiUrl = `${stableUrlXlay}/api/order/getAllBuyOrders`;
  }


  console.log("Fetching buy orders from:", apiUrl);
  console.log("Request body:", body);


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: response.status });
    }


    const data = await response.json();

    //console.log("Response data:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching buy orders:", error);
    return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: 500 });
  }
  
}
