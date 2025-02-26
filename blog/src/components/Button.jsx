import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    text_color = 'text-white',
    className = '',
    ...props
}) {

  return (
    <button className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-400 ${bgColor} ${text_color} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button