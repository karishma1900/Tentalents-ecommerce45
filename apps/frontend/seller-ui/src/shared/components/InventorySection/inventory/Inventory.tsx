'use client';

import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { orderListAtom } from "../../../../configs/constants"; // Adjust path as needed
import './inventory.css';

interface InventoryProps {
  limit?: number; // Optional prop to limit how many orders to show
}

const Inventory: React.FC<InventoryProps> = ({ limit = 3 }) => {
  const [orders] = useAtom(orderListAtom);

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "avail":
        return "available";
      case "restock":
        return "restock-class";
      case "empty":
        return "empty-class";
      default:
        return "";
    }
  };

  return (
    <div className="inventory">
      {orders.slice(0, limit).map((order) => {
        const { product } = order;
        return (
          <div key={product.id} className="inventor-container">
            <div className="single-inventory">
              <div className="inventory-conent">
                <div className="inventory-top">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <h2 className="product-title">{product.name}</h2>
                </div>

                <div className="inventory-section">
                  {product.inventory.variants.map((variant) => (
                    <div key={variant.id} className="inventory-sectionin">
                      <span className="variant-name">{variant.name}</span>
                      <div className="inventorystock">
                        <strong className="text-[var(--primary)]">{variant.stock}</strong>
                        <span className={getStatusClass(variant.status)}>
                          {variant.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Inventory;
