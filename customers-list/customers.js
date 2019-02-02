var faker = require('faker')

function generateCustomers() {
  const data = [];
  const countryList = ["Sweden", 'Norway', 'Denmark'];

  for (let index = 1; index < 55; index++) {
    // const id = faker.internet.password();
    const url = faker.internet.url();
    const contractExpiryDate = faker.date.between('2019-01-30', '2022-01-30');
    const name = faker.name.firstName();
    const numberOfEmployees = faker.random.number({
      'min': 1,
    });
    const country = countryList[Math.floor(Math.random()*countryList.length)];
    const tempData = {
      id: index,
      type: 1,
      name: name,
      country: country,
      websiteUrl: url,
      numberOfEmployees: numberOfEmployees,
      contractExpiryDate: contractExpiryDate,
    }
    data.push(tempData);
  }

  for (let index = 55; index < 120; index++) {
    // const id = faker.internet.password();
    const url = faker.internet.url();
    const contractExpiryDate = faker.date.between('2019-01-30', '2022-01-30');
    const name = faker.name.firstName();
    const numberOfEmployees = faker.random.number({
      'min': 1,
    });
    const country = countryList[Math.floor(Math.random()*countryList.length)];
    const annualTurnover = faker.random.number({min:1142});
    const complianceChecked = faker.random.boolean();

    const tempData = {
      id: index,
      type: 2,
      name: name,
      country: country,
      websiteUrl: url,
      numberOfEmployees: numberOfEmployees,
      contractExpiryDate: contractExpiryDate,
      annualTurnover: annualTurnover,
      complianceChecked: complianceChecked
    }
    data.push(tempData);
  }

  return { "customer": data }
  
}
module.exports = generateCustomers