import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom"
import "./App.css"
import { UserContext } from "./Context"
import Footer from "./Footer"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

    const history = useHistory()
    const context = useContext(UserContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleSubmit = () => {

        if (name.length > 0 && email.length > 0 && phone.length) {
            return (
                context.setUser({ username: name, useremail: email }),
                history.push("/test")
            )
        }
        else {
            return toast("All filed required", { type: "error" })
        }

    }

    // if (name.length > 0 && email.length > 0) {
    //     setProblem(false)
    // }

    return (
        <>
            <ToastContainer />
            <div className="text-center text-danger" style={{ fontFamily: "brush script mt", fontSize: "5rem" }}>Oracleworlds.com</div>
            <div className="row" style={{ margin: "0" }}>
                <div className="col-lg-5 imageBlock">
                    <div className="container">
                        <br /><br /><br />
                        <div className="row">
                            <div className="col-lg-3" />
                            <div className="col-lg-9">
                                <img src="/eight.jpg" className=" mx-auto my-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                    <br /><br /><br /><br /><br />
                    <div className="container">

                        <input type="text" placeholder="Name" className="form-control" name="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                        <input type="email" placeholder="Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                        <input type="number" placeholder="Phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} /> <br />
                        <button className="btn btn-secondary mx-auto d-block" style={{ width: "50%" }} onClick={handleSubmit} >Start Test</button>



                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;