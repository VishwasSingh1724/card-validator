// 'use client'

// import { useEffect, useState } from 'react'
// import { CreditCard, Wifi } from 'lucide-react'

// export default function Component(ctx:any) {
//   const id = ctx.params.id
//   const [isActive, setIsActive] = useState(false)
//     console.log(id);
    
//   useEffect(() => {
//     // Declare the async function inside useEffect and call it immediately
//     const getData = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/create`, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           method: 'GET',
//         })

//         if (!res.ok) {
//           throw new Error('Failed to fetch data')
//         }

//         const data = await res.json()
//         console.log('Fetched data:', data)

//         // Process your data as needed, e.g., set state based on response
//       } catch (error) {
//         console.error('Error fetching data:', error)
//       }
//     }

//     // Call the async function
//     getData()
//   }, []) 
     

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="w-full max-w-md">
//         <div className={`relative bg-gradient-to-br ${isActive ? 'from-purple-500 to-indigo-500' : 'from-gray-400 to-gray-600'} p-8 rounded-xl shadow-2xl transition-all duration-300 ease-in-out`}>
//           <div className="absolute top-4 right-4">
//             <Wifi className="w-8 h-8 text-white opacity-50" />
//           </div>
//           <div className="flex justify-between items-center mb-4">
//             <CreditCard className="w-12 h-12 text-white" />
//             <div className="text-white text-xl font-bold">
//               {isActive ? 'ACTIVE' : 'INACTIVE'}
//             </div>
//           </div>
//           <div className="text-white text-2xl font-bold mb-6">
//             1234 1234 1234 1234
//           </div>
//           <div className="flex justify-between items-end">
//             <div>
//               <div className="text-white text-sm opacity-75 mb-1">Card Holder</div>
//               <div className="text-white font-semibold">John Doe</div>
//             </div>
//             <div>
//               <div className="text-white text-sm opacity-75 mb-1">Expires</div>
//               <div className="text-white font-semibold">12/25</div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-6 flex justify-center">
//           <button
//             onClick={() => setIsActive(!isActive)}
//             className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 ease-in-out ${
//               isActive
//                 ? 'bg-green-500 hover:bg-green-600'
//                 : 'bg-red-500 hover:bg-red-600'
//             }`}
//           >
//             {isActive ? 'Deactivate' : 'Activate'} Card
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { CreditCard, Wifi } from 'lucide-react'

export default function Component(ctx: any) {
  const id = ctx.params.id
  const [isActive, setIsActive] = useState(false)
  const [cardNumber, setCardNumber]:any = useState() // State to store fetched data
  const [cardPhoneNumber, setCardPhoneNumber]:any = useState() // State to store fetched data
  const [cardActivationStatus, setCardActivationStatus]:any = useState() // State to store fetched data
  const [loading, setLoading] = useState(true) // State to show loading status

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/sim-details/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        })

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }

        const data = await res.json()
        setCardNumber(data.SimNumber)
        setCardPhoneNumber(data.phoneNumber)
        setCardActivationStatus(data.ActivationStatus)
      
         // Store the fetched data in state
        setLoading(false) // Data has been loaded, stop showing loading state
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    getData()
  }, []) // Empty dependency array ensures this runs only on component mount

  if (loading) {
    return <div>Loading...</div> // Show a loading state while data is being fetched
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div
          className={`relative bg-gradient-to-br ${isActive ? 'from-purple-500 to-indigo-500' : 'from-gray-400 to-gray-600'} p-8 rounded-xl shadow-2xl transition-all duration-300 ease-in-out`}
        >
          <div className="absolute top-4 right-4">
            <Wifi className="w-8 h-8 text-white opacity-50" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <CreditCard className="w-12 h-12 text-white" />
            <div className="text-white text-xl font-bold">
              {isActive ? 'ACTIVE' : 'INACTIVE'}
            </div>
          </div>
          <div className="text-white text-2xl font-bold mb-6">
            {/* Render card number from fetched data */}
            {cardNumber ? cardNumber: '1234 1234 1234 1234'}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-white text-sm opacity-75 mb-1">Card Holder</div>
              {/* Render card holder from fetched data */}
              <div className="text-white font-semibold">
                {cardPhoneNumber ? cardPhoneNumber : 'John Doe'}
              </div>
            </div>
            <div>
              <div className="text-white text-sm opacity-75 mb-1">Expires</div>
              {/* Render expiration date from fetched data */}
              <div className="text-white font-semibold">
                {'12/25'}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-2 rounded-full font-semibold text-white transition-all duration-300 ease-in-out ${
              isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isActive ? 'Deactivate' : 'Activate'} Card
          </button>
        </div>
      </div>
    </div>
  )
}
