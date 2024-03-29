// import { axios } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from '../../../_actions/user_actions'

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onEmailHandler = (e) => {
      setEmail(e.currentTarget.value);
    };
    const onPasswordHandler = (e) => {
      setPassword(e.currentTarget.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // setPassword(e.currentTarget.value);

        let body = {
            email: Email,
            password: Password
        }


        dispatch(loginUser(body))
            .then(res => {
                console.log(res.payload);
                if (res.payload.loginSucess) {
                //   props.history.push("/");
                    window.location.href = "/";
                } else {
                  alert("error");
                }
        })
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height:'100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>
                <br />
                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;

