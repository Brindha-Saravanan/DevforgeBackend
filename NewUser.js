const express=require('express')
const {MongoClient} = require('mongodb');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
    app.post("/insertLogin", async function(req, res1) {
        try {
            const username = req.body.username;
            const password = req.body.password;
    
            const url = 'mongodb+srv://brindhasara22:Brindha26%40@cluster0.hr0fpyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
            const client = new MongoClient(url);
            const database = 'Devforge';
    
            await client.connect();
            console.log("Connected to db");
            const db = client.db(database);
            
            const document = { username : username , password : password};
    
            const collection = db.collection('LoginDetails');
            const result = await collection.insertOne(document);
    
            if (result.insertedCount === 0) {
                throw new Error("Failed to insert data.");
            }
    
            console.log("Data inserted successfully");
    
            res1.send("<h1>Data Inserted successfully</h1>");
        } catch (error) {
            console.error("Error:", error);
            res1.status(500).send("Failed to insert data.");
        } 
    });

    app.post("/insertDetails", async function(req, res1) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const url = 'mongodb+srv://brindhasara22:Brindha26%40@cluster0.hr0fpyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
            const client = new MongoClient(url);
            const database = 'Devforge';    
            await client.connect();
            const db = client.db(database);            
            const document = { username : username , email : email,score:0,react:0 ,html:0,python:0,java:0,c:0,completedLogs:[]};
    
            const collection = db.collection('UserDetails');
            const result = await collection.insertOne(document);
    
            if (result.insertedCount === 0) {
                throw new Error("Failed to insert data.");
            }
    
            console.log("Data inserted successfully");
    
            res1.send("<h1>Data Inserted successfully</h1>");
        } catch (error) {
            console.error("Error:", error);
            res1.status(500).send("Failed to insert data.");
        } 
    });

    app.post("/fetchques", async function(req, res) {
        try {
            const { questionNumber } = req.body; // Destructure the questionNumber from the request body
            console.log("Fetching question number:", questionNumber);
        
            const url = 'mongodb+srv://brindhasara22:Brindha26%40@cluster0.hr0fpyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
            const client = new MongoClient(url);
            const database = 'Devforge';
        
            await client.connect();
            const db = client.db(database);
            
            const query = { _id: questionNumber };
        
            const collection = db.collection('Questions');
            const response = await collection.findOne(query);
        
            if (!response) {
                throw new Error("Question not found.");
            }
            console.log(response);
        
            res.json(response); // Send the response as JSON
        } catch (error) {
            console.error("Error:", error);
            res.status(404).send("Question not found.");
        }
});


app.post("/login", async function(req, res){
    const { username, password } = req.body;
    // console.log(req.body)
    try {
        const url = 'mongodb+srv://brindhasara22:Brindha26%40@cluster0.hr0fpyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        const client = new MongoClient(url);
        const database = 'Devforge';
        await client.connect();
        const db = client.db(database);
        const collection = db.collection('LoginDetails');
        const result = await collection.findOne({ username: username });
        console.log("result"+result)
        if (result) {
            if (result.password === password) {
                res.json({ message: "authenticated" });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } else {
            res.status(401).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
    
    
app.listen(8000,function(){
    console.log("Server is running on port number 8000")
})
