const pdfform = require("./pdfs.js");
const fs = require("fs");
const json_data = require('./response_json.js');

var output_file = generate_file_name();
var pdf_buf = fs.readFileSync("./UA.pdf"); 
var fields = {
	"Agent Name": [""],
	"Agent City": ["Mangalore"],
	"Agent Country": ["India"],
	"Agent Branch": ["Kerala"],
	"Counsellors Name": ["Deepak"],
	"Counsellors Email": ["deepakrs@gmail.com"],
	"Given Names": ["Shashank"],
	"Given Names": ["Shashank"],
	"Family Names": ["Aithal"],
	"Preferred Name": ["Shashank"],
	"Nationality": ["Indian"],
	"Email": ["test@test.com"],
	"Phone": ["9557466247"],
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
	"Property1": "Urbanest Carlton",
	"Property2": ["Urbanest Carlton"],
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
//var out_buf = pdfform().transform(pdf_buf, fields);

//fs.createWriteStream("./"+output_file+".pdf").write(out_buf);
function generate_file_name() {
    return 'xxxxx4xy-xyxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
