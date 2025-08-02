import { FiTrendingUp } from 'react-icons/fi';
import React from 'react';
import Dropdown from '../dropdown/Dropdownbutton';
import Inventory from './inventory/Inventory';
import Graph from '../../../assets/monitoring.png';
import Image from 'next/image';

const statusOptions = [
  "Last Week",
  "Yesterday",
  "Last Month"
];

const InventorySection = () => {
  return (
    <>
      <div className="inventoryheading flex align-center justify-between gap-[10px] mb-[10px]">
        <div className='flex justify-flex-start items-center gap-[10px]'>
          <Image src={Graph} alt='monitor' />
         
          <h2 className="mainheading">Inventory</h2>
        </div>
        <div className='flex justify-flex-end'>
          <Dropdown
            options={statusOptions}
            defaultValue="Last Week"
            onSelect={(value) => {
              console.log("Selected status:", value);
            }}
          />
        </div>
      </div>
      <Inventory limit={2} />
    </>
  );
};

export default InventorySection;
