
const { expect } = require('chai');
const apiCall = require('./apiCall');
const baseUrl = `http://localhost:3005/api`;
let result;
describe('Menu', async () => {
  it('Get All Menu', async () => {
    const data = {};
    result = await apiCall(baseUrl+'/cms/menu', data, 'get');
    console.log("test result", result)
    expect(result.status).to.equal(200);
  });
});

var user ;
var token ;
describe('Test cases for Register API', async () => {
  it('Valid Request : 200 - SUCCESS', async () => {
    const data = {
            "email" : 'varunsingh911@live.com',
            "password" : "varunsingh",
            "fName" : "Varun",
            "mName" : "",
            "lName" : "Singh",
            "_role" : "Admin",
            "contact" : "8744880991"
    };

    result = await apiCall(baseUrl+'/user', data, 'post');
    expect(result.status).to.equal(200);
    // expect(result.response.success).to.be.a('boolean').to.be.eql('true');
    expect(result.response).to.have.property('user').to.not.null;
    user = result.response.user;
    expect(user).to.have.property('fName').to.be.a('string').to.be.eql(data.fName);
    expect(user).to.have.property('lName').to.be.a('string').to.be.eql(data.lName);
    expect(user).to.have.property('email').to.be.a('string').to.be.eql(data.email);
    expect(user).to.have.property('contact').to.be.a('string').to.be.eql(data.contact);
    expect(user).to.have.property('_id').to.be.a('string');
  });
});

describe('Test cases for Login API', async () => {
  it('Valid Request : 200 - SUCCESS', async () => {
    const data = {
            "email" : 'varunsingh911@live.com',
            "password" : "varunsingh",
    };

    result = await apiCall(baseUrl+'/oauth', data, 'post');
    token = result.response 
    expect(result.status).to.equal(200);
    // expect(result.response.success).to.be.a('boolean').to.be.eql('true');
    expect(result.response).to.have.property('accessToken').to.not.null;
    expect(result.response).to.have.property('refreshToken').to.not.null;
  });
});

describe('Testing user API with Authorization', async () => {
  it('Get All Users', async () => {
    const data = {};
    result = await apiCall(baseUrl+'/user', data, 'get', {Authorization:token.accessToken});
    console.log("all user result", result);
    expect(result.status).to.equal(200);
  });
});
