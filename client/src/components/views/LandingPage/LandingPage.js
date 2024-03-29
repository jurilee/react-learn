import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    const onClickHandler = () => {
      axios.get('/api/users/logout').then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          // props.history.push("/login");
          window.location.href = "/login";
        } else {
          alert("failed to logout");
        }
      });
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height:'100vh'
        }}>
            LandingPage
            <br />
            <button onClick={onClickHandler}>
                LogOut
            </button>
        </div>
    )
}

export default LandingPage;