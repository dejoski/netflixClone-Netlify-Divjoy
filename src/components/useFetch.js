import { useEffect, useState } from 'react';
    
export default function useFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function loadData() {
            const response = await fetch(url, { 
                "method": "GET",
                "headers": {
                  "content-type": "text/html",
                  "x-rapidapi-host": "unogsng.p.rapidapi.com",
                  "x-rapidapi-key": "ac72153c36mshd1814c8f1af20f3p1518fbjsnabee85184908"
                }
              });
            if(!response.ok) {
                // oups! something went wrong
                return;
            }
    
            const posts = await response.json();
            setData(posts.results);
        }
    
        loadData();
    }, [url]);
    return data;
}