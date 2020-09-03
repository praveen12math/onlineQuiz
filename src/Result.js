import React, { useContext, useState, useEffect } from 'react';
import firebase from "firebase/app"
import "firebase/firestore"
import { UserContext } from "./Context"
import { Chart } from "react-google-charts";
import Footer from "./Footer"

const Result = () => {
    const context = useContext(UserContext);
    const [originalAns, setOriginalAns] = useState('')
    const [ans, setAns] = useState([])
    const [loader, setLoader] = useState(true)





    useEffect(() => {

        function fetchData() {
            firebase.firestore()
                .collection("oracleExam")
                .doc("answer")
                .get()
                .then(function (doc) {
                    setOriginalAns(doc.data())
                })
                .catch(function (error) {
                    console.log(error.message);
                })
        }


        function fetchDataTwo() {
            firebase.firestore()
                .collection("oracleUser")
                .doc(context.user.useremail)
                .get()
                .then(function (docu) {
                    setAns(docu.data())
                    setLoader(false)
                })
                .catch(function (error) {
                    console.log(error.message);
                })
        }

        fetchData();
        fetchDataTwo()
    }, [context.user.useremail])


    var arr = [];
    var attempt = 0
    for (var i = 1; i < 6; i++) {
        var newValue = 'a'.concat(i);
        //console.log(originalAns[newValue]);
        //console.log(ans.newValue);
        console.log(newValue);
        if (ans[newValue] === '0000') {
            console.log("not attempt");
            attempt++;
        }

        else if (originalAns[newValue] === ans[newValue]) {
            arr[i - 1] = "correct";
        }
        else {
            arr[i - 1] = "wrong"
        }
    }

    console.log(arr);

    var count = 0;
    for (var j = 0; j < 5; j++) {
        if (arr[j] === "correct") {
            count++;
        }
    }

    if (loader) {
        return (
            <div style={{ backgroundColor: "#758AA2", height: "100vh" }} >
                <div className="row">
                    <div className="col-lg-5 mx-auto">
                        <div className="card shadow p-3" style={{ backgroundColor: "#A4B0BD" }}>
                            <h3 className="text-center">Test Report</h3>
                        </div>
                    </div>
                </div>
                <div className="justify-content-center loader">
                    <img src="loader4.gif" alt="" />
                    <h1>Evaluating</h1>
                </div>
                <Footer />
            </div>
        )
    }
    else {
        return (

            <div style={{ fontFamily: "Domine" }}>
                <Footer />
                {/* <div style={{ backgroundColor: "#758AA2", height: "100vh" }} >
                    {arr.map(name => (
                        <li>
                            {name}
                        </li>
                    ))}
                    {count} <br />
                    {5 - count}
                    <br />
                    {(count / (5 - count)) * 100}
                </div> */}


                <div className="row mt-3">
                    <div className="col-lg-5 mx-auto">
                        <div className="card shadow p-3" style={{ backgroundColor: "#A4B0BD" }}>
                            <h3 className="text-center">Test Report</h3>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-10 col-sm-12 mx-auto">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card shadow">
                                    <Chart
                                        width={'350px'}
                                        height={'300px'}
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[
                                            ['Task', 'Hours per Day'],
                                            ['Correct', count],
                                            ['Wrong', 5 - (count + attempt)],
                                            ['Not Attempt', attempt],
                                        ]}
                                        options={{
                                            //title: 'My Daily Activities',
                                            is3D: true,
                                            //  pieHole: 0.4,
                                            colors: ['#45CE30', '#FF4848', '#F4C724']

                                        }}
                                        rootProps={{ 'data-testid': '1' }}
                                    >
                                    </Chart>
                                </div>
                            </div>
                            {/* <div className="col-6">
                                <h4 className="float-right">Praveen Yadav you got {count / 5 * 100} %
                        <br />
                                    {count / 5 * 100 >= 90 ? ("Well Done !!!") : (count / 5 * 100 >= 75 ? "Good But Need More" : "Need Work Hard")}
                                </h4>
                            </div> */ }


                            <div className="col-lg-6 mt-2">
                                <div className="card shadow">
                                    <div className="row">
                                        <div className="col-12 mx-auto">
                                            <div className="card mt-4 mb-3" style={{ borderLeft: "3px solid lightBlue" }}>
                                                <p className="text-center">5 Total</p>
                                            </div>
                                        </div>

                                        <div className="col-12 mx-auto">
                                            <div className="card mt-2 mb-3" style={{ borderLeft: "3px solid green" }}>
                                                <p className="text-center">{count} Correct</p>
                                            </div>
                                        </div>

                                        <div className="col-12 mx-auto">
                                            <div className="card mt-2 mb-3" style={{ borderLeft: "3px solid red" }}>
                                                <p className="text-center">{5 - (count + attempt)} Wrong</p>
                                            </div>
                                        </div>

                                        <div className="col-12 mx-auto">
                                            <div className="card mt-2 mb-4" style={{ borderLeft: "3px solid yellow" }}>
                                                <p className="text-center">{attempt} Not Attempted</p>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row mt-3">
                    {count / 5 * 100 >= 90 ? (<div className="mx-auto d-block" style={{ fontSize: "100px" }}><span role="img" aria-label="Ok">😀</span></div>) : (count / 5 * 100 >= 75 ? <div className="mx-auto d-block" style={{ fontSize: "100px" }}><span role="img" aria-label="Ok">🙂</span></div> : <div className="mx-auto d-block" style={{ fontSize: "100px" }}><span role="img" aria-label="Ok">😟</span></div>)}

                    {/* <div className="mx-auto d-block" style={{ fontSize: "100px" }}>😀</div>
                    <div className="mx-auto d-block" style={{ fontSize: "100px" }}>🙂</div>
                    <div className="mx-auto d-block" style={{ fontSize: "100px" }}>😟</div> */}

                    <div className="col-12 mb-5">
                        <h4 className="text-center">{context.user.username} you got {count / 5 * 100}% &nbsp;
                            {count / 5 * 100 >= 90 ? ("Well Done !!!") : (count / 5 * 100 >= 75 ? "Good !!!" : "Need Work Hard !!!")}
                        </h4>
                    </div>
                </div>
            </div>
        )
    }


}

export default Result;