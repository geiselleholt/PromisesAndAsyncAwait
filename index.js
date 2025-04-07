// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {
    const dbNumber = await central(id);

    const [dbData, vaultData] = await Promise.all([
      dbs[dbNumber](id).catch((error) => {
        throw new Error(`Database number ${dbNumber} failed: ${error.message}`);
      }),
      vault(id).catch((error) => {
        throw new Error(`Vault failed: ${error.message}`);
      }),
    ]);

    return {
      id: id,
      name: vaultData.name,
      username: dbData.username,
      email: vaultData.email,
      address: {
        street: vaultData.address.street,
        suite: vaultData.address.suite,
        city: vaultData.address.city,
        zipcode: vaultData.address.zipcode,
        geo: {
          lat: vaultData.address.geo.lat,
          lng: vaultData.address.geo.lng,
        },
      },
      phone: vaultData.phone,
      website: dbData.website,
      company: {
        name: dbData.company.name,
        catchPhrase: dbData.company.catchPhrase,
        bs: dbData.company.bs,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

getUserData(10)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
