import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
    /* null - 모두 true - 로그인한 유저만, false - 로그인한 유저는 못들어옴 */
    function AuthenticationCheck() {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(res => {
                console.log(res)

                if (!res.payload.isAuth) {
                    if (option) {
                        window.location.href = "/login";
                    }
                } else {
                    if (adminRoute && !res.payload.isAdmin) {
                        window.location.href = "/";
                    } else {
                        if (option === false) {
                            window.location.href = "/";
                        }
                    }

                }
            })
        }, [])

        return <SpecificComponent />
    }

    return <AuthenticationCheck />;
}