import { useState, useEffect } from 'react'
import { useQuery, QueryHookOptions, useLazyQuery, QueryLazyOptions } from '@apollo/react-hooks';
import { DocumentNode, OperationVariables } from 'apollo-boost';
import { QueryResult } from '@apollo/react-common'

interface MappingQueryOptions<TData, TVariables, TMapped> {
    /**
     * The query document. This is passed to `useQuery`
     */
    query: DocumentNode,
    /**
     * The query options object. This is passed to `useQuery`
     */
    options: QueryHookOptions<TData, TVariables>,
    /**
     * The mapping function.
     *
     * Takes in the raw, unmapped query result data and returns the mapped data
     */
    mapFunction: (data: TData) => TMapped
}

/**
 * Using the passed in `query` and (optional) `options` object, make a query using `useQuery`.
 *
 * Once completed, pass the data to the `mapFunction`
 *
 * Returns a tuple of the mapped data, the is loading state and the full query object from `useQuery`
 *
 * @example
 * // simple query
 * const [mappedData, isLoading, apolloResult] = useMappingQuery<Query, MappedData, Variables>({
 *     query: queryDocument,
 *     mapFunction: (data) => data.key
 * })
 *
 * // a more complex query
 * const [mappedData, isLoading, apolloResult] = useMappingQuery<Query, MappedData, Variables>({
 *     query: queryDocument,
 *     options: {
 *         variables: {
 *             channel: 'cars'
 *         }
 *     },
 *     mapFunction: (data) => {
 *         const vehicleAge = getVehicleAge(data.vehicle.registrationDate)
 *         //... any additional logic
 *         return mappedData;
 *     }
 * })
 */
export const useMappingQuery = <TData = any, TMappedData = any, TVariables = OperationVariables>({ query, options = {}, mapFunction }: MappingQueryOptions<TData, TVariables, TMappedData>): [TMappedData, boolean, QueryResult<TData, TVariables>] => {
    const apolloResult = useQuery<TData, TVariables>(query, options)
    const [mappedData, setMappedData] = useState<TMappedData>({} as TMappedData)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (apolloResult.data && !apolloResult.loading) {
            setMappedData(mapFunction(apolloResult.data))
            setIsLoading(false)
        }
    }, [apolloResult.data, apolloResult.loading, mapFunction])

    return [mappedData, isLoading, apolloResult]
}

export const useMappingLazyQuery = <TData = any, TMappedData = any, TVariables = OperationVariables>({ query, options = {}, mapFunction }: MappingQueryOptions<TData, TVariables, TMappedData>): [(options?: QueryLazyOptions<TVariables> | undefined) => void, TMappedData, boolean, QueryResult<TData, TVariables>] => {
    const [makeQuery ,apolloResult] = useLazyQuery<TData, TVariables>(query, options)
    const [mappedData, setMappedData] = useState<TMappedData>({} as TMappedData)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (apolloResult.data && !apolloResult.loading) {
            setMappedData(mapFunction(apolloResult.data))
            setIsLoading(false)
        }
    }, [apolloResult.data, apolloResult.loading, mapFunction])

    return [makeQuery, mappedData, isLoading, apolloResult]
}
