import bcrypt from "bcryptjs";

export async function getHash(
  password: string,
  salt: number | string
): Promise<string> {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    console.error(error);
    throw new Error("error in generating hash");
  }
}

export async function compareHash(
  dataToCompare: string,
  hash: string
): Promise<Boolean> {
  try {
    return await bcrypt.compare(dataToCompare, hash);
  } catch (err) {
    console.error(err);
    throw new Error("error in comparing with hash");
  }
}
