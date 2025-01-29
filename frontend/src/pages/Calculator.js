"use client"

import { useState } from "react"
import { ChevronDown, DollarSign, ScaleIcon as Scales, Briefcase, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LegalCostEstimator() {
  const [caseType, setCaseType] = useState("Personal Injury")
  const [complexity, setComplexity] = useState("Moderate")
  const [state, setState] = useState("West Virginia")
  const [estimatedCost, setEstimatedCost] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleEstimateCosts = () => {
    setIsCalculating(true)
    // Simulate calculation delay
    setTimeout(() => {
      setEstimatedCost("$5,000 - $10,000")
      setIsCalculating(false)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1b1e] to-[#2a2b30] text-white p-4">
      <motion.div
        className="container mx-auto max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="text-center mb-12">
          <motion.h1
            className="text-[#4169e1] text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block">
              <Scales className="inline-block mr-2 mb-1" size={40} />
              Lex AI
            </span>
          </motion.h1>

          <motion.h2
            className="text-[#4169e1] text-3xl relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Legal Cost Estimator
            <motion.div
              className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4169e1]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.h2>
        </div>

        <motion.div
          className="space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-xl shadow-2xl border border-white/10"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <label className="block mb-2 flex items-center">
              <Briefcase className="mr-2 text-[#4169e1]" />
              Select case type
            </label>
            <div className="relative group">
              <select
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="w-full p-3 pr-10 bg-[#2c2d30] rounded-lg border border-gray-700 appearance-none focus:outline-none focus:border-[#4169e1] transition-all duration-300 group-hover:border-[#4169e1]"
              >
                <option>Personal Injury</option>
                <option>Family Law</option>
                <option>Criminal Defense</option>
                <option>Estate Planning</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#4169e1] transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-2 flex items-center">
              <BarChart2 className="mr-2 text-[#4169e1]" />
              Select case complexity
            </label>
            <div className="relative group">
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full p-3 pr-10 bg-[#2c2d30] rounded-lg border border-gray-700 appearance-none focus:outline-none focus:border-[#4169e1] transition-all duration-300 group-hover:border-[#4169e1]"
              >
                <option>Simple</option>
                <option>Moderate</option>
                <option>Complex</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#4169e1] transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block mb-2 flex items-center">
              <DollarSign className="mr-2 text-[#4169e1]" />
              Select state
            </label>
            <div className="relative group">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 pr-10 bg-[#2c2d30] rounded-lg border border-gray-700 appearance-none focus:outline-none focus:border-[#4169e1] transition-all duration-300 group-hover:border-[#4169e1]"
              >
                <option>West Virginia</option>
                <option>Virginia</option>
                <option>Maryland</option>
                <option>Pennsylvania</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#4169e1] transition-colors" />
            </div>
          </motion.div>

          <motion.button
            onClick={handleEstimateCosts}
            className="w-full px-6 py-4 bg-[#4169e1] text-white rounded-lg hover:bg-[#3158d3] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#4169e1] focus:ring-opacity-50 disabled:opacity-50"
            disabled={isCalculating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCalculating ? (
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <span className="ml-2">Calculating...</span>
              </motion.div>
            ) : (
              "Estimate Costs"
            )}
          </motion.button>

          {estimatedCost && (
            <motion.div
              className="mt-8 text-center p-6 bg-[#4169e1]/10 rounded-lg border border-[#4169e1]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[#4169e1] text-2xl mb-4 font-semibold">Estimated Legal Costs</h3>
              <motion.p
                className="text-3xl font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {estimatedCost}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

