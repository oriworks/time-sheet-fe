import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

interface Props {
	id: string
	name: string
	checked: boolean
	onChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ id, name, checked, onChange }) => {
	const [value, setValue] = useState(checked)
	const handleChange = useCallback(() => setValue(v => !v), [])
	useEffect(() => {
		onChange(value)
	}, [onChange, value])

	return (
		<div
			className={classNames(
				'relative flex justify-start w-full p-1 rounded-full align-middle select-none transition-all duration-500 ease-in',
				{
					'bg-gray-400': !value,
					'bg-green-400': value,
					'justify-end': value
				}
			)}
		>
			<label
				htmlFor={id}
				className={classNames('w-full cursor-pointer pr-4')}
			>
				<input
					type="checkbox"
					name={name}
					id={id}
					className={classNames(
						'block',
						'w-4',
						'h-4',
						'text-white',
						'rounded-full',
						'border-0',
						'appearance-none',
						'cursor-pointer',
						'focus:shadow-none focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent',
						'checked:shadow-none checked:ring-transparent checked:ring-offset-0 checked:ring-offset-transparent',
						'transition-all duration-500 ease-in',
						{
							'ml-full': value
						}
					)}
					onChange={handleChange}
					checked={value}
				/>
			</label>
		</div>
	)
}

export default Switch
