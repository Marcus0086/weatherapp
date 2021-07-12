import styled from 'styled-components';
import { Button, TextField } from "@material-ui/core"
import { useState } from 'react';
import { auth } from "../../firebase";
const Form = ({ id, data }) => {
    const [date, setDate] = useState('');
    const [resArr, setresArr] = useState([]);
    const [temperature, setTemp] = useState('Click 1 for temperature');
    const [wind, setWind] = useState('Click 2 for wind');
    const [pressure, setPressure] = useState('Click 3 for pressure');
    const [errTemp, setErrTemp] = useState(false);
    const [errWind, setErrWind] = useState(false);
    const [errPressure, setErrPressure] = useState(false);
    const getDate = val => {
        setDate(val);
        getData();
    }
    const getData = () => {
        const tempArr = [...data.map((list) => {
            const { main, wind, dt_txt } = list;
            const { temp, pressure } = main;
            const { speed } = wind;
            return {
                temperature: temp,
                pressure: pressure,
                windspeed: speed,
                date: dt_txt
            };
        })];
        const tempresArr = tempArr.filter((ele) => ele !== null || ele !== undefined);
        setresArr([...tempresArr]);
    }
    const getTemp = () => {
        const dateMatch = new RegExp(date);
        const temp = resArr.filter((ele) => {
            const { date } = ele;
            if (date.match(dateMatch)) {
                return ele;
            }
        });
        if (temp.length > 0) {
            setTemp(`${temp[0]['temperature']}`);
        } else {
            setErrTemp(true)
        }
    }
    const getWind = () => {
        const dateMatch = new RegExp(date);
        const temp = resArr.filter((ele) => {
            const { date } = ele;
            if (date.match(dateMatch)) {
                return ele;
            }
        });
        if (temp.length > 0) {
            setWind(`${temp[0]['windspeed']}`);
        } else {
            setErrWind(true)
        }

    }
    const getPressure = () => {
        const dateMatch = new RegExp(date);
        const temp = resArr.filter((ele) => {
            const { date } = ele;
            if (date.match(dateMatch)) {
                return ele;
            }
        });
        if (temp.length > 0) {
            setPressure(`${temp[0]['pressure']}`);
        } else {
            setErrPressure(true)
        }

    }
    const exit = async () => {
        await auth.signOut();
    }
    return (
        <CardContainer id={id}>
            <Title>Weather App!</Title>
            <ContactForm>
                <NameInput required id='standard-required' type='text' label='Enter Date like 2019-03-27 18:00:00'
                    defaultValue={date} onChange={(e) => {
                        getDate(e.target.value);
                        setErrTemp(false);
                        setErrWind(false);
                        setErrPressure(false);
                    }} />
                <TempDiv>
                    <TempButton onClick={getTemp} color='secondary' variant='contained'>1</TempButton>
                    <TempInput id='standard-required' error={errTemp} type='text' label={temperature} helperText={errTemp ? 'temperature not found' : ''} disabled />
                </TempDiv>
                <WindDiv>
                    <WindButton onClick={getWind} color='secondary' variant='contained'>2</WindButton>
                    <WindInput id='standard-required' error={errWind} type='text' helperText={errWind ? 'windspeed not found' : ''} label={wind} disabled />
                </WindDiv>
                <PressureDiv>
                    <PressureButton onClick={getPressure} color='secondary' variant='contained'>3</PressureButton>
                    <PressureInput id='standard-required' error={errPressure} helperText={errPressure ? 'pressure not found' : ''} type='text' label={pressure} disabled />
                </PressureDiv><br />
                <ExitButton onClick={exit} color='secondary' variant='contained'>0</ExitButton>
            </ContactForm>
        </CardContainer>
    )
}
const CardContainer = styled.div`
    padding: 1rem;
    width: 35%;
    position: relative;
    color: #303030;
    font-weight: 500;
    border-radius: 1.5rem;
    border: 1px solid orange;
    transition: all .25s ease-in-out;
    text-align: center;
    z-index: 1;
    align-items: center;
    justify-content: center;
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 5.0px );
    -webkit-backdrop-filter: blur( 5.0px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    @media(max-width:1200px) {
        width: 60%;

    }
    @media(max-width:800px) {
        width: 80%
    }
    @media(max-width:550px) {
        width: 95%;
        height: 30rem;
        font-weight: 300;
    }

`;
const Title = styled.h1`
    @media(max-width:550px) {
        font-size: 1.75rem;
    }
`;
const ContactForm = styled.form``;
const NameInput = styled(TextField)`
    && {
        width: 80%;
        height: 2.5rem;
        font-size: 1rem;
        margin-top: 2.5rem;
        margin-bottom: 2.5rem;
        padding: .5rem;
        @media(max-width:550px) {
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            font-size: .8rem;
        }
    }
`;
const TempInput = styled(NameInput)`
    && {
        width: 50%;
        color: black;
    }
`;
const WindInput = styled(TempInput)`
`;
const PressureInput = styled(TempInput)``;
const TempDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-evenly;
    width: 100%;
    gap: 1rem;
`;

const WindDiv = styled(TempDiv)``;
const PressureDiv = styled(TempDiv)``;
const TempButton = styled(Button)``;
const WindButton = styled(TempButton)``;
const PressureButton = styled(TempButton)``;
const ExitButton = styled(TempButton)``;
export default Form;
