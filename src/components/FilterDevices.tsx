import { Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Context } from './Providers'
import { useDebounce } from 'use-debounce'

const FilterDevices = () => {
  const { device } = useContext(Context)!
  const [inputValue, setInputValue] = useState<string>(device.searchName)
  const [debouncedValue] = useDebounce(inputValue, 2000)

  useEffect(() => {
    device.setSearchName(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    setInputValue(device.searchName)
  }, [device.searchName])

  return (
    <div className="mb-3">
      <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Поиск устройств..." />
    </div>
  )
}

export default FilterDevices
