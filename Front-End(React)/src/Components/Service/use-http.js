import { useState } from "react";

import axios from 'axios';

const useHttp =()=>{  
    
    // const college_url = "http://localhost:9001/college/";
    // const student_url = "http://localhost:9000/student/";
    const [error,setError] = useState(false);
    const [loading,isLoading] = useState(false);

    const fetchData = async(url,method,body,action)=>{
        if(method==='POST')
        {
            isLoading(true);
            await axios.post(url,body)
            .then((res)=>{
                action(res)
            })
            .catch((err)=>{
                setError(true)
                setInterval(()=>{
                    setError(false)
                },1000)
            })
            .finally(()=>{
                isLoading(false);
            });
        }
        else if(method==='GET')
        {
            isLoading(true);
            await axios.get(url)
            .then((res)=>{
                action(res)
            })
            .catch((err)=>{
                setError(true)

                setInterval(()=>{
                    setError(false)
                },1000)
            })
            .finally(()=>{
                isLoading(false);
            });
        }
        else if(method==='DELETE')
        {
            isLoading(true);
            await axios.delete(url)
            .then((res)=>{
                action(res)
            })
            .catch((err)=>{
                setError(true)

                setInterval(()=>{
                    setError(false)
                },1000)
            })
            .finally(()=>{
                isLoading(false);
            });
        }
        else if(method==='PUT')
        {
            isLoading(true);
            await axios.put(url,body)
            .then((res)=>{
                action(res)
            })
            .catch((err)=>{
                setError(true)

                setInterval(()=>{
                    setError(false)
                },1000)
            })
            .finally(()=>{
                isLoading(false);
            });
        }
    }

    return [error,loading,fetchData];
}

export default useHttp;