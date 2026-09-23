import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Gif from "../assets/bhaai.gif";//imp

function HomePage(){
    const navigate = useNavigate();
    return(
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img src={Gif}
                alt="background" 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -2
                }}
            />
            <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: -1
            }}/>

            <Button variant="contained"
            onClick={()=>{
                navigate('/chat')
            }}>Babu Ready aa..</Button>
        </div>
    )
}

export default HomePage;