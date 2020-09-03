import React, { useState, useContext } from 'react';
import { Redirect } from "react-router-dom"
import firebase from "firebase/app"
import "firebase/firestore"
import { firebaseConfig } from "./Config"
import "./Test.css"
import Loading from './Loading';
import { UserContext } from "./Context"
import Footer from "./Footer"

firebase.initializeApp(firebaseConfig);



const Test = () => {
    const context = useContext(UserContext)

    // firebase.firestore()
    //     .collection("oracleUser")
    //     .doc(context.user.useremail)
    //     .set({ answer: ["okay", new Date()] })
    //     .then(function () {
    //         console.log("success");
    //     })

    //  console.log(context.user.email);
    const str1 = "q";
    const str2 = "option-";
    const [question, setQuestion] = useState(null)
    const [fetchquestion, setFetchQuestion] = useState(1)
    const [stopData, setStopData] = useState(true)
    const [option, setOption] = useState([])
    const [dataLoading, setDataLoading] = useState(true);
    var que = str1.concat(fetchquestion)
    var opt = str2.concat(fetchquestion);

    if (fetchquestion === 6) {
        return <Redirect to="result" />
    }

    if (stopData) {
        setDataLoading(true);

        firebase
            .firestore()
            .collection("oracleExam")
            .doc("question")
            .get()
            .then(function (doc) {
                // console.log(doc.data()[que]);
                setQuestion(doc.data()[que]);
            })
            .catch(function (error) {
                console.log(error.message);
            })


        firebase
            .firestore()
            .collection("oracleExam")
            .doc(opt)
            .get()
            .then(function (doc) {
                //          console.log(doc.data().a);
                setOption(doc.data())
                setDataLoading(false)
            })
            .catch(function (error) {
                console.log(error.message);
            })

        setStopData(false)
    }

    function submitAnswer() {

        const updateAns = 'a'.concat(fetchquestion);

        var ans1 = 0, ans2 = 0, ans3 = 0, ans4 = 0;

        if (document.getElementById("r1").checked)
            ans1 = 'a';

        if (document.getElementById("r2").checked)
            ans2 = 'b';

        if (document.getElementById("r3").checked)
            ans3 = 'c';

        if (document.getElementById("r4").checked)
            ans4 = 'd';

        var ans = ans1 + "" + ans2 + "" + ans3 + "" + ans4;

        firebase.firestore()
            .collection("oracleUser")
            .doc(context.user.useremail)
            .set({ [updateAns]: ans }, { merge: true })

    }

    // console.log(stopData);
    // console.log(fetchquestion);
    // console.log(que);


    if (dataLoading) {
        return (
            <>
                <Loading />
                <Footer />
            </>
        )
    }
    else {
        return (
            <div style={{ backgroundColor: "#758AA2", height: "100vh" }} >
                <br /> <br /> <br /> <br /> <br /> <br />
                <h2 style={{ fontFamily: "Domine" }} className="text-center text-white">{fetchquestion}. &nbsp; {question}</h2>
                <br />
                <div className="container mt-3 text-white">
                    <div className="row">
                        <div className="col-1" />
                        {/* <div className="col-lg-5 col-sm-2"></div> */}
                        <div className="col-11">

                            <form>
                                <div className="form-group">
                                    <input type="checkbox" id="r1" disabled={false} />{' '}
                           A. {option.a}
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" id="r2" disabled={false} />{' '}
                           B. {option.b}
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" id="r3" disabled={false} />{' '}
                           C. {option.c}
                                </div>

                                <div className="form-group">
                                    <input type="checkbox" id="r4" disabled={false} />{' '}
                           D. {option.d}
                                </div>

                                <button type="reset" onClick={() => { setFetchQuestion(fetchquestion + 1); setStopData(true); submitAnswer() }} className="btn btn-success mt-4 mx-auto d-block" >Next</button>
                            </form>
                            {/* <button className="btn" onClick={() => { document.getElementById("r1").disabled = true; document.getElementById("r2").disabled = true; document.getElementById("r3").disabled = true; document.getElementById("r4").disabled = true }}>Submit</button> */}
                        </div>

                    </div>
                </div>
                <h6 className="text-center text-white bg-dark fixed-bottom mb-0">More than one option may be correct</h6>
            </div>
        )
    }
}

export default Test;