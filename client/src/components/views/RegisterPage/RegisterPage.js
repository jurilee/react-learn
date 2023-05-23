import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_actions";

function RegisterPage() {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ComfimPassword, setComfimPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onComfimPassword = (e) => {
        setComfimPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (Password !== ComfimPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body)).then(res => {
            console.log(res.payload);
                if (res.payload.sucess) {
                  //   props.history.push("/login");
                    window.location.href = "/login";
                } else {
                    alert("failed to sign up");
                }
        })
    };

    return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler}></input>
                    <label>Name</label>
                    <input type="text" value={Name} onChange={onNameHandler}></input>
                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler}></input>
                    <label>Comfim Password</label>
                    <input type="password" value={ComfimPassword} onChange={onComfimPassword}></input>
                    <br />
                    <button>회원가입</button>
                </form>
            </div>
        );
}

export default RegisterPage;
