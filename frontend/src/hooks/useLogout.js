import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout function
        dispatch({ type: 'LOGOUT' })
        workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
    }
    return { logout };
}