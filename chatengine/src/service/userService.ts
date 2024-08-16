class UserService {
  constructor() {
    console.log("user service");
  }

  public getUser = async (): Promise<{ name: string }> => {
    return { name: "user-1" };
  };

  public addUser = async (
    username: string,
    password: string
  ): Promise<{ message: string }> => {
    return { message: "User Added" };
  };
}

export default UserService;
