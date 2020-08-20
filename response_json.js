// var data = readJsonFromUrl("https://www.unilodgers.com/api/v1/bookings/1ebacf5d-8600-45af-b16d-12223c02f108");
// var dat = data.attributes;
// console.log(dat);
const https = require('https');
const pdfform = require("./pdfs.js");
                const fs = require("fs");
let url = "https://www.unilodgers.com/api/v1/bookings/1ebacf5d-8600-45af-b16d-12223c02f108";

    https.get(url,(res)=>{
        let body="";
        res.on("data",(chunk)=>{
            body += chunk;
        });
    
        res.on("end",()=>{
            try{
                let json = JSON.parse(body);
                

                var output_file = generate_file_name();
                var pdf_buf = fs.readFileSync("./UA.pdf"); 
                var json_attributes = json.data.attributes;
                var fields = {
                    "Agent Name": [json_attributes.agent_name],
                    "Agent City": [""],
                    "Agent Country": ["India"],
                    "Agent Branch": ["Kerala"],
                    "Counsellors Name": ["Deepak"],
                    "Counsellors Email": ["deepakrs@gmail.com"],
                    "Given Names": [json_attributes.your_first_name],
                    "Family Names": [json_attributes.your_Surname],
                    "Preferred Name": [json_attributes.student_preferred_name],
                    "Nationality": [json_attributes.nationality],
                    "Email": [json_attributes.your_email_address],
                    "Phone": [json_attributes.your_phone_number],
                    "Current Address": ["AIMIT,Beeri,Mangalore."],
                    "City": ["Mangalore"],
                    "Country": ["India"],
                    "PostcodeZip": ["575022"],
                    "Medical Conditions": ["Normal"],
                    "UniversityCollege": ["Mangalore"],
                    "Year of graduation": ["2020"],
                    "Student ID": ["181912"],
                    "Date of Birth": ["05/10/1997"],
                    "EC Title": ["Student"],
                    "EC First Name": ["Melroy"],
                    "EC Last Name": ["Pinto"],
                    "EC Relation": ["Friend"],
                    "EC Email": ["melroyglanPinto@gmail.com"],
                    "EC Phone": ["6542355413"],
                    "EC Current Address": ["J.P Nagar,3rd Phase,Bangalore."],
                    "EC City": ["Bangalore"],
                    "EC Country": ["India"],
                    "EC PostcodeZIP": ["541254"],
                    "Preferred Room Type 1#": ["A/C"],
                    "Preferred Room Type 2#": ["Non A/C"],
                    "Budget per week": ["No"],
                    "Preferred Property 1": ["Urbanest Darlington"],
                    "Preferred Property 2": ["Urbanest Carlton"],
                    "Preferred Start Date": ["05/05/2015"],
                    "Preferred End Date": ["10/10/2010"],
                    "Additional Comments": ["Test comment"],
                    Gender:1,
                    /*
                    0:Male
                    1:Female
                    2:Other
                    */
                    "Course": [2],
                    "Under 18 years": [1],
                    "Year Of Study": [2],
                    "Preferred Length of stay": [1],
                    "Disability Access Required": [1],
                    "Apartment Share Preference": [1],
                    "Rental Payment Frequency": [1],
                    "Rental Payment Method": [1]
                
                };
                var out_buf = pdfform().transform(pdf_buf, fields);
                
                fs.createWriteStream("./"+output_file+".pdf").write(out_buf);
                
                
                
            }catch(error){
                console.error(error.message);
            };
        })
    }).on("error",(error)=>{
        console.error(error.message);
    });

    function generate_file_name() {
        return 'xxxxx4xy-xyxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
