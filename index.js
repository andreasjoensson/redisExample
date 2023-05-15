import { createClient } from "redis";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const client = createClient({
  url: process.env.REDIS_HOST,
});

client.on("error", function (err) {
  console.log("err", err);
  throw err;
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully");

    await client.set("my_test_key", "my test value");
    console.log("Key set successfully");

    const value = await client.get("my_test_key");
    console.log(`The value of "my_test_key" is: ${value}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

run();
