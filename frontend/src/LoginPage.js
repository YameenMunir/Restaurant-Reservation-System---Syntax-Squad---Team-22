import React, {useState} from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login submitted:', {email, password});
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    width: '300px'
                }}
            >
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Login</h2>
                <div style={{marginBottom: '10px'}}>
                    <label htmlFor="email" style={{display: 'block', marginBottom: '5px'}}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label htmlFor="password" style={{display: 'block', marginBottom: '5px'}}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc'}}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginPage;

