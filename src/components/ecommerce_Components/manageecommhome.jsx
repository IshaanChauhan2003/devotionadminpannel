import React from 'react'

const Manageecommhome = ({isMonthly , setIsMonthly}) => {
    
  return (
    <div>
      <button
          onClick={() => setIsMonthly(!isMonthly)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {isMonthly ? 'Switch to Annual' : 'Switch to Monthly'}
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Products Sold</h2>
          <p className="text-3xl font-bold">{isMonthly ? '500' : '6000'}</p>
        </div>    
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Refund Requests</h2>
          <p className="text-3xl font-bold">25</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Cancel Requests</h2>
          <p className="text-3xl font-bold">15</p>
        </div>
      </div>

      {/* Most Selling Products List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Order Requests</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Product Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Price</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Product ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Customer ID</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Shipment Location</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Request Status</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Example of a product row */}
            <tr>
              <td className="py-2 px-4 border-b">Product A</td>
              <td className="py-2 px-4 border-b">$49.99</td>
              <td className="py-2 px-4 border-b">P_001</td>
              <td className="py-2 px-4 border-b">Cust_001</td>
              <td className="py-2 px-4 border-b">Mumbai, Pune , Azad nagar xyz opposite to K Mall </td>
              <td className="py-2 px-4 border-b">Pending</td>
              <td className="py-2 px-4 border-b">
                <button className='bg-green-500 rounded-md'><p className='p-2'>Accept</p></button>
                <button className='ml-2 bg-red-600 rounded-md'><p className='p-2'>Reject</p></button>
                </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Product A</td>
              <td className="py-2 px-4 border-b">$49.99</td>
              <td className="py-2 px-4 border-b">P_001</td>
              <td className="py-2 px-4 border-b">Cust_001</td>
              <td className="py-2 px-4 border-b">Mumbai, Pune , Azad nagar xyz opposite to K Mall </td>
              <td className="py-2 px-4 border-b">Pending</td>
              <td className="py-2 px-4 border-b">
                <button className='bg-green-500 rounded-md'><p className='p-2'>Accept</p></button>
                <button className='ml-2 bg-red-600 rounded-md'><p className='p-2'>Reject</p></button>
                </td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Product A</td>
              <td className="py-2 px-4 border-b">$49.99</td>
              <td className="py-2 px-4 border-b">P_001</td>
              <td className="py-2 px-4 border-b">Cust_001</td>
              <td className="py-2 px-4 border-b">Mumbai, Pune , Azad nagar xyz opposite to K Mall </td>
              <td className="py-2 px-4 border-b">Accepted</td>
              <td className="py-2 px-4 border-b">
                <button className='bg-green-500 rounded-md'><p className='p-2'>Accept</p></button>
                <button className='ml-2 bg-red-600 rounded-md'><p className='p-2'>Reject</p></button>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Manageecommhome
