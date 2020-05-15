import React from "react";
import CookieConsent from "react-cookie-consent";
import {Link} from "react-router-dom";

export default function Cookie() {

    return (
        <CookieConsent
            location="bottom"
            buttonText="Elfogadom"
            cookieName="CsokisSuti"
            style={{background: "#2B373B"}}
            buttonStyle={{color: "#4e503b", fontSize: "20px"}}
            expires={30}
        >
            <div align="center">

                Ez a weboldal sütiket használ a felhasználói élmény javítása érdekében <Link to="/termsandconditions"> <span role="img" aria-label="cookie">🍪</span>Olvasd el a felhasználási feltételeket<span role="img" aria-label="cookie">🍪</span></Link> {" "}
            </div>
        </CookieConsent>



    )
}