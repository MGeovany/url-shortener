interface User {
  email: string;
  image: string;
  name: string;
}
interface UserSession {
  expires: string;
  user: User;
}
