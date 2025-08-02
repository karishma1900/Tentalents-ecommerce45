'use client';

import React from "react";
import { useAtom } from "jotai";
import { orderListAtom } from "../../../../configs/constants";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface ProductSoldProps {
  limit?: number;
}

const ProductSold: React.FC<ProductSoldProps> = ({ limit }) => {
  const [orders] = useAtom(orderListAtom);

  // Limit the number of items if limit prop is provided
  const limitedOrders = limit ? orders.slice(0, limit) : orders;

  return (
    <div>
      <div>
        {limitedOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center py-2 rounded-[10px] background-[var(--lightblue2)] "
          >
            <div className="soldleft flex gap-[10px] items-center">
              <Image
                src={order.product.image.src || order.product.image}
                alt={order.product.name}
                width={50}
                height={50}
              />
              <h3 className="product-title2 text-[15px]">{order.product.name}</h3>
            </div>

            <div className="rightside flex gap-[10px] items-center ">
              <p className="text-[var(--secondary)]">+{order.product.sold} <strong>Sold</strong></p>
              <ChevronRight className="text-black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSold;
