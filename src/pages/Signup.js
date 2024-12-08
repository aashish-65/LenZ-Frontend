import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/Signup.css'; // Ensure to import the CSS

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        plan: '',
    });

    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://lenz-backend.onrender.com/api/auth/signup', formData);
            setUserId(response.data.userId);
            setError(''); // Clear any previous errors on successful signup
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
            // Clear the error after 5 seconds
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>
            {userId ? (
                <div className="signup-success">
                    <h3>Signup Successful!</h3>
                    <p>Your Unique ID: <strong>{userId}</strong></p>
                </div>
            ) : (
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Plan</option>
                        <option value="400">₹400 - Basic Plan</option>
                        <option value="3000">₹3000 - Standard Plan</option>
                        <option value="5000">₹5000 - Premium Plan</option>
                    </select>
                    <button type="submit">Signup</button>
                </form>
            )}
            {error && <p className="signup-error">{error}</p>}
        </div>
    );
};

export default Signup;
