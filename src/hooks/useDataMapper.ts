import { useState, useEffect } from 'react'

/**
 * Map `data` from one struct to another using provided `mapFunction`
 *
 * @example
 *
 * const mappedData = useDataMapper<DataType, MappedDataType>(data as DataType, data => data.really.long.object.data)
 */
export const useDataMapper = <TData, TMapped>(isQueryLoading: boolean, data: TData, mapFunction: (data: TData) => TMapped): [TMapped, boolean] => {
    const [mappedData, setMappedData] = useState<TMapped>({} as TMapped)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data && !isQueryLoading) {
            setMappedData(mapFunction(data))
            setIsLoading(false)
        }
    }, [data, isQueryLoading, mapFunction])

    return [mappedData, isLoading]
}
