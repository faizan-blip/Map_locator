import { Box, InputAdornment, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import PinDropIcon from '@mui/icons-material/PinDrop';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import {Autocomplete, DirectionsRenderer, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api'
import DeleteIcon from '@mui/icons-material/Delete';
export default function Map(props) {

const key = 'AIzaSyAYBivEevsC3sXYWfY6n9803tvASqB0TUI';
const center = { lat: 18.9219846, lng: 72.8331227 };

const[directionres , setDirectionres] = useState(null)
const[distance , setDistance] = useState('')
const [originValue, setOriginValue] = useState('');
const [destinationValue, setDestinationValue] = useState('');
 const originRef = useRef(null)
 const destinationRef = useRef(null)
 const stopRef = useRef(null)
   
 const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: key , 
    libraries:['places'],
 })


if(!isLoaded){
   return <div>Error</div>
}

const calculate = async()=>{
    if(originRef.current.value === '' || destinationRef.current.value === ''){
        return alert('Please Fill the location')
    }
    /*global google */
    const directionservice = new google.maps.DirectionsService()
    const waypoints = [];
    if (stopRef.current.value !== '') {
        waypoints.push({
            location: stopRef.current.value,
            stopover: true,
        });
    }
    const result = await directionservice.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints
    })
    setDirectionres(result)
  let totalDistance = 0;
  result.routes[0].legs.forEach((leg) => {
    totalDistance += leg.distance.value;
  });
  setDistance(totalDistance / 1000 + 'Kms');

    setOriginValue(originRef.current.value);
    setDestinationValue(destinationRef.current.value);
}

const clear = ()=>{
    setDirectionres(null)
    setDistance('')
    setOriginValue(null)
    originRef.current.value = null
    stopRef.current.value = null
    destinationRef.current.value = null
}
  return (
    <>
    <Box sx={{background:props.color, display:"flex" , flexDirection:"column", alignItems:"center" , padding:"2em 1em" , gap:"20px"}}>
         <Typography sx={{color:"rgba(27, 49, 168, 1)" ,fontSize:"20px"}}>Let's calculate <span style={{fontWeight:"600" ,color:"rgba(27, 49, 168, 1)"}}> distance </span>from Google Maps</Typography>
         <Box sx={{display:"flex" , justifyContent:"center" ,flexWrap:"wrap-reverse", alignItems:"center" , gap:{xs:"20px" , md:"100px"}}}>
               <Box sx={{ padding:"4em 2em" ,  width: { xs: "100%", md: '560px' } , height:"100%" , display:"flex" , justifyContent:"center" , alignItems:"center" , flexDirection:"column"} }>
               <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }, display:"flex" , justifyContent:{xs:"center" , md:"start"} , alignItems:"center" , gap:{xs:"40px" , md:"100px"} , flexDirection:{xs:"column" , md:"row"}
      }}
      autoComplete="off"
    >
        <Box sx={{display:"flex" , flexDirection:"column" , gap:"25px"}}>
            <Autocomplete>
        <TextField
          label="Origin"
          id="outlined-size-small"
          placeholder='Origin'
          inputRef={originRef}
          InputLabelProps={{
            style: { color: props.icon },
          }}
          InputProps={{ style:{color:props.icon},startAdornment:(
                          <InputAdornment position='start'>
                            <TripOriginIcon sx={{color:"green" , transform:"Scale(0.7)"}}/>
                          </InputAdornment>
          ),
        }}
          size="small"
        />
        </Autocomplete>
        <Autocomplete>
        <TextField
          label="Stop"
          id="outlined-size-small"
          size="small"
          placeholder='Stop'
          inputRef={stopRef}
          InputLabelProps={{
            style: { color: props.icon },
          }}
          InputProps={{style:{color:props.icon},startAdornment:(
            <InputAdornment position='start'>
              <StopCircleIcon sx={{color:props.icon , transform:"Scale(0.7)"}}/>
            </InputAdornment>
),
}}
        />
        </Autocomplete>
          <Autocomplete>
         <TextField
          label="Destination"
          id="outlined-size-small"
          size="small"
          placeholder='Destination'
          inputRef={destinationRef}
          InputLabelProps={{
            style: { color: props.icon },
          }}
          InputProps={{style:{color:props.icon},startAdornment:(
            <InputAdornment position='start'>
              <PinDropIcon sx={{color:props.icon, transform:"Scale(0.9)"}}/>
            </InputAdornment>
),
}}
        />
        </Autocomplete>
        </Box>
        <Box sx={{display:"flex" , justifyContent:"center" , alignItems:"center" , gap:"10px" , flexDirection:"column"}}>
        <Button variant="outlined"  onClick={calculate} sx={{borderRadius:"32px" , width:"136px" , height:"50px" , fontWeight:"600" , background:"#1B31A8"  , fontSize:"13px", color:"white"}} className='hover' >
        Calculate
      </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={clear} sx={{borderRadius:"32px" , width:"136px" , height:"50px" , fontWeight:"600" , background:"#1B31A8"  , fontSize:"13px", color:"white"}} className='hover' >
        Delete
      </Button>
      </Box>
        </Box>
           <Box sx={{width:{xs:"100%" , md:"490px"} , height:{xs:"100%" , md:"155px"} , background:props.border , margin:"2em 0" , borderRadius:"8px" , padding:"1em 1em" , display:"flex" ,flexDirection:"column" , gap:"40px" , boxShadow:"inset 2px 0px 7px white"}}>
        <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center"}}>
        <Typography sx={{color:props.letter ,fontSize:"22px" , fontWeight:"700"}}>Distance</Typography>
        <Typography sx={{color:"#0079FF" , fontSize:"30px" , fontWeight:"700"}}>{distance}</Typography>
           </Box>
           {directionres ? (
  <Typography sx={{color:props.letter ,fontSize:"17px"}}>The distance Between <span style={{color:props.letter1 , fontWeight:"700"}}>{originValue}</span> and  <span  style={{color:props.letter1 , fontWeight:"700"}}>{destinationValue}</span>  via the selected route is <span style={{color:"#1E2A32" , fontWeight:"700"}} > {distance}</span></Typography>
           ):(
            <Typography sx={{color:props.letter ,fontSize:"17px"}}>The distance Between <span style={{color:props.letter1 , fontWeight:"700"}}>Origin</span> and <span  style={{color:props.letter1 , fontWeight:"700"}}>Destination</span>  via the selected route is <span style={{color:"#1E2A32" , fontWeight:"700"}} >....</span></Typography>
           )}        
  </Box>
               </Box>
               <Box sx={{height:"511px" , width: { xs: "100vw", md: '560px' }}}>
                    <GoogleMap center={center} zoom={15} mapContainerStyle={{width:"100%" , height:"100%"}}
                    options={{
                        zoomControl:false,
                        streetViewControl:false,
                        mapTypeControl:false,
                    }}
                    >
                   <Marker position={center}/>
                   {directionres && (
                    <DirectionsRenderer directions={directionres}/>
                   )}
                    </GoogleMap>
               </Box>
         </Box>
    </Box>
    </>
  )
}
