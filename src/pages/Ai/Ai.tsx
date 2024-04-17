"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import './styles.css';

function Ai() {
    const [ai, setAi] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [dob, setDob] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [messages, setMessages] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);

    const handleData = async () => {
        setSubmitted(true);
        console.log(dob, place, name);
    }

    const handleMessage = async () => {

        try {
            await axios.post('https://sepm.onrender.com/complete', {
                message: `"As an astrologer and numerologist, your task is to provide deep insights and predictions on the questions asked based on a person's date of birth, place of birth, and name. You should analyze these three key pieces of information to offer accurate and personalized readings for the individual seeking guidance.Ensure that your responses are detailed, engaging and insightful providing valuable information that resonates with the individual. Use a mix of astrological interpretations, numerology principles, and intuition to craft unique and meaningful responses for each question asked. Keep in mind the importance of empathy and clarity in your readings to establish a strong connection with the person seeking guidance. Strive to combine these elements seamlessly to deliver comprehensive and enlightening responses tailored to each individual's needs and inquiries. The question is" ${messages} . Date of Birth: ${dob} Place of Birth: ${place} Name: ${name} answer in less than 180 words.`
            })
                .then((response) => {
                    console.log(response.data.result);
                    setAi(response.data.result.text);
                    setLoading(false);
                })
        }
        catch (error) {
            console.log("Error");
        }
    }

    return (
        <div className="not-found page">
            <h1>AI</h1>
            <h2>Ask me anything </h2>

            {submitted === false ? <form onSubmit={handleData}>
                <input type="text" placeholder='Enter your DOB' required onChange={(e) => setDob(e.target.value)} />
                <input type="text" placeholder='Enter Your Full Name' required onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Enter Your Place of birth' required onChange={(e) => setPlace(e.target.value)} />
                <button type='submit'>Submit</button>
            </form> :
                <p>Hiii {name}  </p>}

            <input type="text" placeholder='Ask the question' onChange={(e) => setMessages(e.target.value)} />
            <button onClick={handleMessage}>Send</button>
            {loading ? <p>Response...</p> : <p>{ai}</p>}
        </div>
    );
}

export default Ai;
