import { useState,useEffect } from "react";
import { fetchAPOD } from "./FetchData";
import "./App.css";

interface APODData{
  title:string,
  explanation:string,
  url:string,
  hdurl?:string,
  date:string,
  media_type:string
}

export default function App(){
  const [apod, setApod] = useState<APODData | null>(null)
  const [loading,setLoading]=useState<boolean>(true)
  const [error,setError]=useState<string | null>(null)
  const [date,setDate]=useState("")

  useEffect(()=>{
    setLoading(true)
    fetchAPOD(date)
    .then((data)=>setApod(data))
    .catch((error)=>setError(error.message))
    .finally(()=>setLoading(false))
  },[date]
)
return (
  <>
  {loading && <p>Loading .......</p>
  }
  {
    error && <h1>{error}</h1>
  }
  {!loading && apod &&
  <div className="main">
    <h1>Astronomy Picture Of The Day</h1>
    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
    <h2>{apod?.title}</h2>
    {apod?.media_type==="image"?(
      <img src={apod.url} alt={apod.title} width={500} referrerPolicy="no-referrer"/>
    ):(
      <div>
   
        {/* <button><a href={apod?.hdurl}/>Click here to watch the video</button> */}
      <video src={apod?.url}></video>
      </div>
    )}
    {apod?.media_type==="image" && (
      <p><a href={apod.hdurl||apod.url} download target="_blank" rel="noreferrer">Download Image</a></p>
    )}
    <p>{apod?.explanation}</p>
  </div>
  }
  
  </>
)

}