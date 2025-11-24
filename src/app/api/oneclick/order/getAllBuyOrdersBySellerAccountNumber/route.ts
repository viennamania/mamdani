import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

const stableUrl = 'https://georgia.stable.makeup';


export async function POST(request: NextRequest) {

  const body = await request.json();

  const {
    fromDate,
    toDate,
    limit,
    page,
    privateSale,
    accountNumber,
  } = body as { fromDate?: string; toDate?: string; limit?: number; page?: number; privateSale?: boolean; accountNumber?: string };


  console.log("getAllBuyOrders fromDate", fromDate);
  console.log("getAllBuyOrders toDate", toDate);
  console.log("getAllBuyOrders limit", limit);
  console.log("getAllBuyOrders page", page);
  console.log("getAllBuyOrders privateSale", privateSale);
  console.log("getAllBuyOrders accountNumber", accountNumber);



  

  ///console.log("getAllBuyOrders body", body);



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
  const apiUrl = `${stableUrl}/api/order/getAllBuyOrdersBySellerAccountNumber`;

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
