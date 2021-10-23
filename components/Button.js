import React from 'react'
import { motion } from 'framer-motion'

function Button({onClick= null, children = null}) {
    return (
        <motion.button 
        whileHover = {{
            scale: .95
        }}
        className="p-2 w-40 self-center z-50 bg-blue-500 px-3 text-gray-50 rounded-md" onClick={onClick}>{ children }</motion.button>
    )
}

export default Button
