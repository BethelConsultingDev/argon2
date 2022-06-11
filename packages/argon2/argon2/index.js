function main(args) {

  const argon2 = require("argon2");
  const crypto = require("crypto");

  crypto.randomFill(new Uint8Array(16), async (err, salt) => {
    if (err) throw err;

    //Generate encryption Key using the secret.
    const key = await argon2.hash(SecuritySettings.SecretKey, {
        type: argon2.argon2id,
        memoryCost: 32*1024, //32MB in kb
        hashLength: 32,
        parallelism: 2,
        timeCost: 3,
        raw: true,
        salt: salt
    });

    console.log(key);

    let name = args.name || 'stranger'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    return {"body": greeting}

  });
    
}

exports.main = main
