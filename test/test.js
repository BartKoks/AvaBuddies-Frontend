var request = require('supertest');
var expect = require('chai').expect;
var should = require('chai').should();
const dotenv = require('dotenv');
const result = dotenv.config();

const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
var express = require('express');

var indexRouter = require('../routes/index');
var authRouter = require('../routes/auth');
var userRouter = require('../routes/user');

const UserModel = require('../models/user');


require('../auth/auth');

var app = express();