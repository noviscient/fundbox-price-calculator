import React, { useMemo } from 'react'

export type PDebugJSONDump = {
	data: any,
	header?: string
}
export const DebugJSONDump: React.FC<PDebugJSONDump> = ({ data, header }) => {

	const body = useMemo(() => JSON.stringify(data, null, 2), [data])

	return <div>
		{ header ? <div className='mb-[6px] font-sans font-base text-H13 text-aqua-6/80'>{ header }</div> : null }
		<div className='w-full max-w-xl px-[20px] py-[12px] rounded-sm-4px bg-aqua-2 text-aqua-6 text-H12 min-w-0 min-h-0 max-h-[min(90vh,100%)] overflow-auto whitespace-pre-wrap font-mono'>
			{ body }
		</div>
	</div>
}
