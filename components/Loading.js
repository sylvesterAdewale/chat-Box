import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
            <motion.div
           animate={{
               transform: "rotate(360deg)",
           }}
           transition={{
               duration: .5
           }}
            className="loader flex items-center justify-center border-blue-500 w-48 h-48">
                <div className="load transform rotate-45 border-blue-500 w-28 h-28"></div>
            </motion.div>
        </div>
    )
}

export default Loading
