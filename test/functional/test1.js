const { expect } = require('chai');


describe('Simple test group for demonstrating purpose', () => {


  it('[#Sanity][#Functional] sample positive test case', async () => {
    console.log("hello world from successfull test case")
    expect(0).to.eq(0)
  })
  it('[#Functional] sample negative test case', async () => {
    console.log("hello world from successfull test case")
    expect(0).to.eq(1)
  })

})