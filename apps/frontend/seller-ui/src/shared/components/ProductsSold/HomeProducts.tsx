import React from 'react'
import ProductSold from './product_soldperformance/ProductSold'
import Graph from '../../../assets/monitoring.png'
import Image from 'next/image'
import Dropdown from '../dropdown/Dropdownbutton';
const statusOptions = [
  "Past Week",
  "Yesterday",
  "Last Month"
];

const HomeProducts = () => {
  return (
     <div className="productsoldmain p-[15px] rounded-[10px] background-white">
        <div className="productsoldheading">
             <div className="inventoryheading flex align-center justify-between gap-[10px] mb-[10px]">
                   <div className='flex justify-flex-start items-center gap-[10px]'>
                     <Image src={Graph} alt='monitor' />
                    
                     <h2 className="mainheading">Inventory</h2>
                   </div>
                   <div className='flex justify-flex-end'>
                     <Dropdown
                       options={statusOptions}
                       defaultValue="Past Week"
                       onSelect={(value) => {
                         console.log("Selected status:", value);
                       }}
                     />
                   </div>
                 </div>

            


        </div>
        <div className="productsoldvalues">
            <ProductSold limit={2} />

        </div>
     </div>
  )
}

export default HomeProducts