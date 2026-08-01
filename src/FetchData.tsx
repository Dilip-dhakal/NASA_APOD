export const fetchAPOD=async(date?:string)=>{
  const API_KEY=import.meta.env.VITE_NASA_API_KEY
  const dateparam=date?`&date=${date}`:''
  const data=await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${dateparam}`)
  return data.json()
}