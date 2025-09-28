import  {createContext, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { loginUser, fetchCurrentUserProfile } from '../lib/apis';

const UserContext = createContext({
    user: null,
    isAuthenticated: false,
    login: (username, password) => { },
    logout: ()=>{}
});


export const UserContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const fetchUserProfile = () => {
            fetchCurrentUserProfile()
            .then((res) => {
                setUser(res.data);
                setIsAuthenticated(true);
            })
            .catch((err) => {
                console.log(err);
                setIsAuthenticated(false);
        })
    }

    const login = (username, password) => {
            loginUser(username, password)
            .then((res) => {
                window.localStorage.setItem('token', res.data?.token);
                setIsAuthenticated(true);
                toast.success('LoggedIn Successfully');
                navigate('/');
                fetchUserProfile();
            })
            .catch((err) => {
                toast.error(err.response.data?.message);
            });
    }

    const logout = () => {
        window.localStorage.setItem('token', "");
        setUser(null);
        setIsAuthenticated(false);
    }


    useEffect(() => {
        fetchUserProfile();
    }, [])
    

    const context = {
        user,
        isAuthenticated,
        login,
        logout
    }

    return <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext
