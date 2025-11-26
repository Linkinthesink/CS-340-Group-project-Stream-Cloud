import {Link} from "react-router-dom"
import { useEffect, useState } from 'react';
import logo from '../Images/StreamCloudLogo.png'


export function HomePage({ backendURL }){


    const onReset = async () => {
        if (!window.confirm(`Reset Database?`)) return;
        try {
            console.log("sent reset request")
            console.log(backendURL)
            const response = await fetch((backendURL ? backendURL : '') + '/reset');
            if (response.status === 200) {
                alert(`Reset Database`);
            } else {
                alert('Failed to reset database');
            }
        } catch (err) {
            console.error(err);
            alert('Reset failed');
        }
    };

    const modeToggle = () => {


    };

    return (
        <div class="Homepage">    

                <div class="container">
                    <div id="logobox">
                        <img src={logo} alt="Stream Cloud" id="logo"></img>
                    </div>
                    <h2><b>About:</b> </h2>
                    <p>The Stream Cloud is a database management system that is designed to organize and connect
                    information about artists, albums, and tracks across multiple streaming platforms.</p>
                </div>
                <button id="reset" onClick={e => {e.preventDefault(); onReset()}}> Reset DB </button>
        </div>
    );
  }
