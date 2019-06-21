'use strict';
const log = console.log;
const fs = require('fs');
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    let patient = {}; 
    try{
        patient = readJSON();
    }
    catch(e){
        alert("patient.json file does not exist")
    }
    const patientName = patient.name.given + " " +patient.name.family;
    console.log("Name of patient: " + patientName);
    const patientNameSpan = "<span>" + patientName +"</span>";
    res.write('<h1>Name of patient: ' + patientNameSpan + '</h1>' );
    const orgName = patient.managingOrganization.display;
    const orgNameSpan = "<span>" + orgName +"</span>";
    res.write("<h1>Organization name: "  + orgNameSpan + '</h1>' );
    const gender = patient.gender;
    const genderSpan = "<span>" + gender +"</span>";
    res.write("<h1>Gender: "  + genderSpan + '</h1>' );
    const conditions = patient.conditions;
    const conditionsNumSpan = "<span>" + conditions.length +"</span>";
    res.write("<h1>Number of conditions they have: : "  + conditionsNumSpan + '</h1>' );
    res.write("<h1>List of all conditions: <\h1>");
    conditions.map((condition)=>{
        let string = "- " + condition;
        let stringHeader = "<h1>" + string +"</h1>";
        res.write(stringHeader);
    })

})

const readJSON = () =>{
    const patient = fs.readFileSync('patient.json');
    return JSON.parse(patient);
}

const port = process.env.PORT || 3000
app.listen(port, () => {
	log('Listening on port 3000...')
})
