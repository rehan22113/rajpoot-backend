// require('dotenv').config()
require('colors')
const Db=require("./Database/Connection")
// const helmet = require("helmet");
const express = require('express');
const app = express();
const port = 3000 || process.env.port
const bodyParser = require('body-parser');
const adminApi = require('./Routes/Admin');
const categoryApi = require('./Routes/Category');
const industryApi = require('./Routes/Industry');
const principalApi = require('./Routes/Principal');
const clientApi = require('./Routes/Clients')
const contactApi = require('./Routes/Contact')
const postApi = require('./Routes/Post')
const cookieParser = require('cookie-parser');
const path = require('path')
const cloudinary = require('cloudinary').v2;
// const corsOptions=require("./utility/corsOptions")
//new one
const cors=require("cors")
const morgan = require("morgan");
const PostModel = require('./models/post');
const CategoryModel = require('./models/category');
const PrincipalModel = require('./models/principal');
const IndustryModel = require('./models/industry');
// const serverless = require('serverless-http')
// Middleware

morgan.token('splitter', (req) => {
  return "\x1b[36m--------------------------------------------\x1b[0m\n";
});
morgan.token('statusColor', (req, res, args) => {
  // get the status code if response written
  var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
      ? res.statusCode
      : undefined

  // get status color
  var color = status >= 500 ? 31 // red
      : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
              : status >= 200 ? 32 // green
                  : 0; // no color

  return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

app.use(morgan(`:splitter \n :date \n \x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length/:res[content-length] :user-agent\n:splitter`))
// app.use(helmet())

//database is established here
Db();
app.use('/', express.static(path.join(__dirname, 'Public')))

// app.use(express.json())
// app.use(cors(corsOptions));

app.use(cors({origin: ["http://localhost:5173","http://127.0.0.1:5500","https://rajpoot-link.vercel.app"],credentials: true }))
// app.options("", cors(corsConfig))

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true,limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(helmet());

          
cloudinary.config({ 
  cloud_name: 'dblzpvlsz', 
  api_key: '923229445637612', 
  api_secret: 'vkIhdQk5emAgVXhZ8GyQNOL2VVo' 
});

// Routes Api
app.use('/api/v1/admin', adminApi);
app.use('/api/v1/industry', industryApi);
app.use('/api/v1/category',categoryApi);
app.use('/api/v1/principal',principalApi);
app.use('/api/v1/post',postApi);
app.use('/api/v1/client',clientApi);
app.use('/api/v1/contact',contactApi);

// testing endpoint
app.get('/api/v1',function (req,res){  
  // console.log("'Connection Established'".underline.green.bgWhite)
  res.status(200).json({msg:'Connection Established'});
})
app.get("/api/v1/detail",async(req,res)=>{
  const totalPost = await PostModel.find().count()
  const totalCategory = await CategoryModel.find().count()
  const totalPrincipal = await PrincipalModel.find().count()
  const totalIndustry = await IndustryModel.find().count()
  res.status(200).json({totalCategory,totalIndustry,totalPost,totalPrincipal})
})

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
