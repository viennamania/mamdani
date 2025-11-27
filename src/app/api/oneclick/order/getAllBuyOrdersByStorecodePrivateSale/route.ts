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
    ////privateSale,
    storecode,
    buyerBankInfoAccountNumber,
    stabilityId,
  } = body as { fromDate?: string; toDate?: string; limit?: number; page?: boolean; storecode?: string; buyerBankInfoAccountNumber?: string; stabilityId?: string; };

  

  ///console.log("getAllBuyOrders body", body);



  // when fromDate is "" or undefined, set it to 365 days ago
  let updateFromDate = fromDate;
  if (!fromDate || fromDate === "") {
    const date = new Date();
    date.setDate(date.getDate() - 365);
    updateFromDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  // when toDate is "" or undefined, set it to today
  let updatedToDate = toDate;
  if (!toDate || toDate === "") {
    
    const date = new Date();

    date.setDate(date.getDate() + 1); // add one day to include today

    updatedToDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  }


  const updateBody = {
    fromDate: updateFromDate,
    toDate: updatedToDate,
    limit: limit,
    page: page,
    storecode: storecode,
    buyerBankInfoAccountNumber: buyerBankInfoAccountNumber,
  };


  // call api
  let apiUrl = `${stableUrlStable}/api/order/getAllBuyOrdersByStorecodePrivateSale`;

  if (stabilityId === '150b53f165222304af7c45dc45c73863') {
    apiUrl = `${stableUrlStable}/api/order/getAllBuyOrdersByStorecodePrivateSale`;
  } else if (stabilityId === '9ed089930921bfaa1bf65aff9a75fc41') {
    apiUrl = `${stableUrlGeorgia}/api/order/getAllBuyOrdersByStorecodePrivateSale`;
  } else if (stabilityId === 'd140e95d67da87ff62efabf401171aa0') {
    apiUrl = `${stableUrlXlay}/api/order/getAllBuyOrdersByStorecodePrivateSale`;
  }





  console.log("Fetching buy orders from:", apiUrl);
  console.log("Request updated body:", updateBody);


  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      //////body: JSON.stringify(body),
      body: JSON.stringify(updateBody),
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: response.status });
    }


    const data = await response.json();

    console.log("Response data:", data);



    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching buy orders:", error);
    return NextResponse.json({ error: "Failed to fetch buy orders" }, { status: 500 });
  }
  
}
