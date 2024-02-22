import { AnimatePresence, motion } from 'framer-motion'
import React, { RefObject, useEffect, useState } from 'react'
import { cn } from '../utils/react-ext'
import { LoadingSpinner } from './LoadingSpinner'

export type PPrimaryButton = {
	isLoading?: boolean,
	iconOnly?: boolean,
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => void,
	btnRef?: RefObject<HTMLButtonElement>,
	clsFontSize?: string
} & Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onClick' | 'ref'>

export const PrimaryButton: React.FC<PPrimaryButton> = ({ children, className, isLoading, onClick, iconOnly, btnRef, clsFontSize, ...props }) => {
	const [innerIsLoading, setInnerIsLoading] = useState<boolean>(isLoading ?? false)
	useEffect(() => { if (typeof isLoading === 'boolean') setInnerIsLoading(isLoading) }, [isLoading])
	return <button
		className={`font-medium flex items-center  ${ iconOnly ? 'py-[8px] px-[9px]' : 'py-[7px] px-[1rem]' } rounded-sm-4px bg-primary-5 text-neutral-0 ${clsFontSize ?? 'text-H12'}  transition-colors  ${ className } relative group ${ innerIsLoading ? 'cursor-default' : 'cursor-pointer hover:bg-primary-6 active:translate-y-[1px] active:bg-primary-6' }`}
		{...props}
		ref={btnRef}
		onClick={(innerIsLoading || !onClick) ? undefined : (e) => onClick(e, setInnerIsLoading)}
		onMouseDown={innerIsLoading ? undefined : props.onMouseDown}
	>
		{/* {icon ? <Icon className={`-ml-0.5 h-[16px] w-[16px] ${ iconOnly ? '-mr-0.5' : 'mr-1.5' } fill-neutral-0`} name={icon} /> : null} */}
		{children}

		<AnimatePresence>
			{
				innerIsLoading && <motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn(
						'absolute flex items-center justify-center transition-colors top-0 left-0 right-0 bottom-0 rounded-sm-4px',
						innerIsLoading ? 'bg-primary-5' : 'bg-primary-5 group-hover:bg-primary-6 group-active:bg-primary-6'
					)}
				>
					<div className='w-1.5' />
					<LoadingSpinner theme='white_fg_only' />
				</motion.div>
			}
		</AnimatePresence>
	</button>
}

