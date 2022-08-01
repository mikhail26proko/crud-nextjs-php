import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import styles from "../styles/Update.module.scss";
import { useRouter } from "next/router"
import { useState } from 'react';

const Update = ( {data, dataAll} ) => {

    const router = useRouter()

    const { id } = data || {}

    const [hid,Hid] = useState(data.hid)
    const [full_name,FullName] = useState(data.full_name)
    const [address,Address] = useState(data.address)
    const [phone,Phone] = useState(data.phone)
    
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
            "method" : "update",
            "data" : {
                "id" : id,
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
                    <>ID: {id}</>
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
                    defaultValue={full_name}
                    id="full_name"
                    onChange={FullNameChange}
                    sx={{ width: 300 }}
                    label="FULL NAME"
                />
                <br />
                <br />
                <TextField 
                    defaultValue={address}
                    id="address"
                    onChange={AddressChange}
                    sx={{ width: 300 }}
                    label="ADDRESS"
                />
                <br />
                <br />
                <TextField 
                    defaultValue={phone}
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

export default Update;