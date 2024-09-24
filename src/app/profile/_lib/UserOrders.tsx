import { useUserOrders } from "@/hooks/useUserOrders";
import Link from "next/link";

function UserOrders({ userContactId }: { userContactId: string }) {
  const { data: ordersRes, error, isLoading } = useUserOrders(userContactId);
  if (isLoading) return <h2>Loading...</h2>;
  
  if (!ordersRes) return <h2>No orders</h2>;

  return (
    <>
      <h1 className="text-xl2">Orders</h1>
      <div className="mt-12 flex flex-col">
        {ordersRes?.orders.map((order) => (
          <Link
            href={"/order/" + order._id}
            key={order._id}
            className="flex justify-between rounded-md px-2 py-6 even:bg-slate-100 hover:bg-green-50"
          >
            <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
            <span className="w-1/4">
              ${order.priceSummary?.subtotal?.amount}
            </span>
            {order._createdDate && (
              <span className="w-1/4">{String(order._createdDate)}</span>
            )}
            <span className="w-1/4">{order.status}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default UserOrders;
