import axios from 'axios';
import { useState } from 'react';
import { IoIosAlert } from "react-icons/io";

function Ai() {
    const [ai, setAi] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [dob, setDob] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [messages, setMessages] = useState<string>('');

    const handleData = async () => {
        localStorage.setItem('dob', dob);
        localStorage.setItem('place', place);
        localStorage.setItem('name', name);
    }
    const handleSend = async () => {
        setLoading(true);
        setAi('');
        await handleMessage();
    }

    const handleMessage = async () => {
        try {
            const response = await axios.post('https://sepm.onrender.com/complete', {
                message: `The task involves providing detailed insights and predictions for the question asked based on an individual's date of birth, place of birth, and name using the principles of astrology and numerology. To approach this, astrological interpretations, numerology principles, and intuitive insights will be utilized to craft personalized readings that resonate deeply with the seeker. The analysis will involve interpreting the alignment of celestial bodies at birth, including the influence of the Ascendant Sign on personality traits and the impact of the Moon's Position on emotions and instincts. Numerology will be applied. Intuitive perceptions will enhance the analysis, providing holistic guidance that covers spiritual and emotional aspects. Insights and predictions will be tailored to address the specific question asked. The goal is to deliver detailed, relevant, and insightful responses with clarity and coherence in predictions and guidance. The individual's Date of Birth is ${localStorage.getItem('dob')}, Place of Birth is ${localStorage.getItem('place')}, Name is ${localStorage.getItem('name')} and the question is ${messages} for accurate analysis and personalized readings. Your answer should be clear and concise less than 180 words, with bullet points, selecting a fitting emoji for each focusing on conveying the main ideas effectively.`
            });
            setAi(response.data.result.text);

        } catch (error) {
            console.log("Error");
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">AI</h1>
            <h2 className="text-2xl mb-8">Ask me anything</h2>

            {localStorage.getItem('dob') && localStorage.getItem('name') && localStorage.getItem('place') ?
                <p className="text-xl">Hi <span className='text-gradient-to-r from-indigo-500'>{localStorage.getItem('name')}</span></p> :
                <form onSubmit={handleData} className="flex flex-col gap-4">
                    <input type="text" placeholder="Enter your DOB" required onChange={(e) => setDob(e.target.value)} className="input-field p-2 rounded-md text-base" />
                    <input type="text" placeholder="Enter Your Full Name" required onChange={(e) => setName(e.target.value)} className="input-field p-2 rounded-md text-base" />
                    <input type="text" placeholder="Enter Your Place of Birth" required onChange={(e) => setPlace(e.target.value)} className="input-field p-2 rounded-md text-base" />
                    <button type="submit" className="btn-primary bg-zinc-900 rounded-md  text-white mb-2">Submit</button>
                </form>
            }

            {localStorage.getItem('dob') && localStorage.getItem('name') && localStorage.getItem('place') ?
                <div className="flex flex-col gap-4">
                    {loading ?

                        <p className="text-sm text-white bg-red-400 rounded-md p-2 font-extralight">It usually takes 1-2 minutes to respond.</p>
                        :
                        <div>
                            <input type="text" placeholder="Ask your question" onChange={(e) => setMessages(e.target.value)} className=" p-2 text-base rounded-md m-2" />
                            <button onClick={handleSend} className="btn-primary bg-green-900 text-white rounded-md">Send</button>
                        </div>}

                </div> :
                <p className="bg-green-200 text-black flex p-2 rounded-md w-1/2 text-sm font-extralight text-center"><IoIosAlert className='my-auto mx-1 text-red-600' /> Please provide your details to receive a fully customized answer to your questions.</p>
            }
            {ai === '' ? <p className="text-base mt-4 w-1/2 text-justify "></p> :
                <p className="text-base mt-4 w-1/2 text-justify bg-gray-200 p-4 rounded-md flex flex-col mb-8"><span className='font-bold font-serif mb-2 text-lg'>{messages}</span>{ai}</p>}
        </div>
    );
}

export default Ai;
