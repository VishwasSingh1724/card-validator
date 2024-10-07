'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function App() {
  const [SimNumber, setSimNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errors, setErrors] = useState({ sim: '', phone: '' })

  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
    console.log(SimNumber,phoneNumber);
    

      const res = await fetch(`http://localhost:3000/create`, {
      headers: {
          'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ SimNumber, phoneNumber, ActivationStatus:"Active" })
  })
   
  router.push(`/card/${SimNumber}`)

  }

  const handleSimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSimNumber(e.target.value)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">SIM & Phone Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="sim" className="block text-sm font-medium text-gray-700 mb-2">
              SIM Number
            </label>
            <input
              type="text"
              id="sim"
              value={SimNumber}
              onChange={handleSimChange}
              placeholder="Enter your SIM number"
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
              maxLength={20}
            />
            {errors.sim && <p className="mt-2 text-sm text-red-600">{errors.sim}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 ease-in-out"
              maxLength={15}
            />
            {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}