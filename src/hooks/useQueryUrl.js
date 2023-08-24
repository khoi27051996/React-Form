import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import qs from 'qs'
export const useQueryUrl = () => {
    const [searchParam, setSearchParam] = useSearchParams()
    const queryParam = Object.fromEntries(searchParam)
    const navigate = useNavigate()
    const location = useLocation()
    const setQueryParam = (param) => {
        const string = qs.stringify(param, {
            addQueryPrefix: true
        })
        navigate(location.pathname + string)
    }
    return [queryParam, setQueryParam]
}