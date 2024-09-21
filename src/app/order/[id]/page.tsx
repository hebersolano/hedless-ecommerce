import getOrderById from "@/lib/data-access/getOrderById";
import { searchParamsT } from "@/lib/types";
import Link from "next/link";
import { notFound } from "next/navigation";

async function OrderPage({ searchParams }: { searchParams: searchParamsT }) {
  const orderId = searchParams.id;
  if (!orderId) notFound();
  const order = await getOrderById(orderId);
  if (!order) notFound();

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-xl">Order Details</h1>
      <div className="mt-6 flex flex-col gap-6">
        <div>
          <span className="font-medium">Order Id: </span>
          <span>{order._id}</span>
        </div>
        <div>
          <span className="font-medium">Receiver Name: </span>
          <span>
            {order.billingInfo?.contactDetails?.firstName +
              " " +
              order.billingInfo?.contactDetails?.firstName}
          </span>
        </div>
        <div>
          <span className="font-medium">Receiver Email: </span>
          <span>{order.buyerInfo?.email}</span>
        </div>
        <div>
          <span className="font-medium">Price: </span>
          <span>{order.priceSummary?.subtotal?.amount}</span>
        </div>
        <div>
          <span className="font-medium">Payment Status: </span>
          <span>{order.paymentStatus}</span>
        </div>
        <div>
          <span className="font-medium">Order Status: </span>
          <span>{order.status}</span>
        </div>
        <div>
          <span className="font-medium">Delivery Address: </span>
          <span>
            {order.billingInfo?.address?.addressLine1 +
              " " +
              order.billingInfo?.address?.city}
          </span>
        </div>
      </div>
      <Link href="#" className="mt-6 text-primary underline">
        Have a problem? Contact us
      </Link>
    </div>
  );
}

export default OrderPage;
