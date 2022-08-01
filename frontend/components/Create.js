import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import styles from "../styles/Update.module.scss";
import { useRouter } from "next/router"
import { useState } from 'react';

const Create = ( {dataAll} ) => {

    const router = useRouter()

    const [hid,Hid] = useState('')
    const [full_name,FullName] = useState('')
    const [address,Address] = useState('')
    const [phone,Phone] = useState('')
    
    const HidChange = (event) => {
        Hid(event.target.value);
    };
    const FullNameChange = (event) => {
        FullName(event.target.value);
    };
    const AddressChange = (event) => {
        Address(event.target.value);
    };
    const PhoneChange = (event) => {
        Phone(event.target.value);
    };


    const saveButton = async () =>{
        const save = {
            "method" : "create",
            "data" : {
                "hid" : hid,
                "full_name" : full_name,
                "address" : address,
                "phone" : phone
            }
        };
        await fetch("http://localhost:8080",{
            method: 'POST',
            body: JSON.stringify(save),
        }).then((res)=>{router.push("/")})
    }

    return (
        <>
            <div className={styles.whiteBoard}>

                <h4>
                    New Company
                </h4>

                <Autocomplete
                    disablePortal
                    id="HID"
                    options={dataAll}
                    getOptionLabel={(option) => option.id}
                    inputValue={hid}
                    onChange={HidChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField key={params} {...params} label="HID" />}
                />
                <br />
                <br />
                <TextField 
                    id="full_name"
                    onChange={FullNameChange}
                    sx={{ width: 300 }}
                    label="FULL NAME"
                />
                <br />
                <br />
                <TextField 
                    id="address"
                    onChange={AddressChange}
                    sx={{ width: 300 }}
                    label="ADDRESS"
                />
                <br />
                <br />
                <TextField 
                    id="phone"
                    onChange={PhoneChange}
                    sx={{ width: 300 }}
                    label="PHONE"   
                />
                <br />
                <br />

                <Button 
                    onClick={ saveButton }
                    variant="contained">
                        SAVE
                </Button>

            </div>
            
        </>
    )

}

export default Create;